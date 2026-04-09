'use client'

import { ApolloProvider } from '@apollo/client'
import { makeClient } from '@/service/apollo.client'
import LoginForm from '@/components/auth/login-form'
import Separator from '@/components/ui/separator'

const client = makeClient()

export default function AuthPageClient() {
  return (
    <ApolloProvider client={client}>
      <div className="w-full max-w-md rounded-xl bg-gray-900 p-8 shadow-2xl border border-gray-800">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Sign In
        </h2>
        <LoginForm />
        <Separator />
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account? Contact the administrator.
        </p>
      </div>
    </ApolloProvider>
  )
}
