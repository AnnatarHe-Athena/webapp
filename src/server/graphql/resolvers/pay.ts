import { GraphQLError } from 'graphql'
import { eq } from 'drizzle-orm'
import { users, purchases } from '@/db/schema'
import { ROLE_PAID, ROLE_MEDIUM } from '@/server/auth'
import type { GraphQLContext } from '../context'

function ensureUser(ctx: GraphQLContext) {
  if (!ctx.user) {
    throw new GraphQLError('Unauthorized', { extensions: { code: 401 } })
  }
  return ctx.user
}

export const payResolvers = {
  Mutation: {
    applePurchase: async (
      _: unknown,
      args: { skuId: string; receipt: string; level: string },
      ctx: GraphQLContext
    ) => {
      const user = ensureUser(ctx)

      // Verify Apple IAP receipt
      // In production, this calls Apple's verifyReceipt endpoint
      const verifyUrl = 'https://buy.itunes.apple.com/verifyReceipt'
      const verifyPayload = {
        'receipt-data': args.receipt,
        password: process.env.APPLE_SHARED_SECRET || '',
      }

      try {
        const resp = await fetch(verifyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(verifyPayload),
        })

        if (!resp.ok) {
          throw new GraphQLError('Apple receipt verification failed', { extensions: { code: 400 } })
        }

        const result = await resp.json() as { status: number }
        // Status 0 means valid receipt
        // Status 21007 means sandbox receipt sent to production - retry with sandbox
        if (result.status !== 0 && result.status !== 21007) {
          throw new GraphQLError('Invalid Apple receipt', { extensions: { code: 400 } })
        }

        // If sandbox receipt, verify against sandbox
        if (result.status === 21007) {
          const sandboxResp = await fetch('https://sandbox.itunes.apple.com/verifyReceipt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(verifyPayload),
          })
          const sandboxResult = await sandboxResp.json() as { status: number }
          if (sandboxResult.status !== 0) {
            throw new GraphQLError('Invalid Apple receipt (sandbox)', { extensions: { code: 400 } })
          }
        }
      } catch (err) {
        if (err instanceof GraphQLError) throw err
        console.error('Apple receipt verification error:', err)
        throw new GraphQLError('Apple receipt verification failed', { extensions: { code: 500 } })
      }

      // Record the purchase
      await ctx.db.insert(purchases).values({
        channel: 'apple',
        skuId: args.skuId,
        level: args.level,
        userId: user.id,
        notes: 'apple: ' + args.receipt.substring(0, 100),
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      // Determine new role based on SKU level
      const newRole = args.level === 'medium' ? ROLE_MEDIUM : ROLE_PAID

      // Upgrade user role
      await ctx.db
        .update(users)
        .set({ role: newRole })
        .where(eq(users.id, user.id))

      return true
    },
  },
}
