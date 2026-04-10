'use client'

import { useState, useCallback } from 'react'
import { ApolloProvider, useQuery, useMutation } from '@apollo/client/react'
import { makeClient } from '@/service/apollo.client'
import { getUid } from '@/service/token'
import Information from '@/components/profile/information'
import PhotoGrid from '@/components/photos/photo-grid'
import Separator from '@/components/ui/separator'
import Loading from '@/components/ui/loading'
import { gql } from '@apollo/client'

const FETCH_USER = gql`
  query FetchUser($id: ID) {
    users(id: $id) {
      id
      email
      name
      avatar
      bio
      role
    }
  }
`

const FETCH_COLLECTIONS = gql`
  query Collections($from: Int!, $size: Int!, $cursor: Int!) {
    collections(from: $from, size: $size, cursor: $cursor) {
      count
      edges {
        id
        cell {
          id
          img
          text
          isCollected
        }
      }
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUserInfo($username: String, $avatar: String, $bio: String) {
    updateUserInfo(username: $username, avatar: $avatar, bio: $bio) {
      id
      name
      avatar
      bio
    }
  }
`

const client = makeClient()

function ProfileContent({ userId }: { userId: string }) {
  const currentUid = typeof window !== 'undefined' ? getUid() : ''
  const isMe = currentUid === userId

  const userQuery = useQuery<any>(FETCH_USER, {
    variables: { id: userId },
  })

  const collectionsQuery = useQuery<any>(FETCH_COLLECTIONS, {
    variables: { from: 0, size: 20, cursor: 1 << 30 },
    skip: !isMe,
  })

  const [updateUser] = useMutation<any>(UPDATE_USER)

  const loadMoreCollections = useCallback(() => {
    const edges = collectionsQuery.data?.collections?.edges ?? []
    if (edges.length === 0) return
    const lastId = edges[edges.length - 1].id
    collectionsQuery.fetchMore({
      variables: { from: 0, size: 20, cursor: lastId },
      updateQuery(prev: any, { fetchMoreResult }: any) {
        if (!fetchMoreResult) return prev
        return {
          collections: {
            ...fetchMoreResult.collections,
            edges: [...prev.collections.edges, ...fetchMoreResult.collections.edges],
          },
        }
      },
    })
  }, [collectionsQuery])

  if (userQuery.loading) return <Loading />

  const user = userQuery.data?.users
  if (!user) return <div className="py-20 text-center text-gray-500">User not found</div>

  const collectionCells = (collectionsQuery.data?.collections?.edges ?? []).map((e: any) => ({
    id: e.cell.id,
    img: e.cell.img,
    text: e.cell.text,
    isCollected: e.cell.isCollected,
  }))

  return (
    <div className="rounded-xl bg-gray-900 p-8 border border-gray-800">
      <Information
        user={user}
        isMe={isMe}
        onUpdate={(data) => updateUser({ variables: data })}
      />
      {isMe && (
        <>
          <Separator />
          <h3 className="mb-4 text-lg font-semibold text-white">My Collections</h3>
          <PhotoGrid
            cells={collectionCells}
            loading={collectionsQuery.loading}
            loadMore={loadMoreCollections}
          />
        </>
      )}
    </div>
  )
}

export default function ProfilePageClient({ userId }: { userId: string }) {
  return (
    <ApolloProvider client={client}>
      <ProfileContent userId={userId} />
    </ApolloProvider>
  )
}
