'use client'

import { ApolloProvider, useQuery, useMutation } from '@apollo/client'
import { makeClient } from '@/service/apollo.client'
import VenusList from '@/components/venus/venus-list'
import Loading from '@/components/ui/loading'
import toast from 'react-hot-toast'
import { gql } from '@apollo/client'

const VENUS_LIST = gql`
  query VenusList($pagination: Pagination!, $source: venusSource) {
    venusList(pagination: $pagination, source: $source) {
      count
      edges {
        id
        uid
        source
        name
        avatar
        bio
        initLoaded
        rawData
        remarks
        priority
      }
    }
  }
`

const ADD_VENUS = gql`
  mutation AddVenus($uid: String!, $source: venusSource!) {
    addVenus(uid: $uid, source: $source) { id uid source name }
  }
`

const REMOVE_VENUS = gql`
  mutation RemoveVenus($id: Int) {
    removeVenus(id: $id)
  }
`

const UPDATE_VENUS = gql`
  mutation UpdateVenus($id: Int!, $name: String, $remarks: String) {
    updateVenus(id: $id, name: $name, remarks: $remarks) { id name remarks priority }
  }
`

const client = makeClient()

function VenusContent() {
  const { data, loading, fetchMore, refetch } = useQuery(VENUS_LIST, {
    variables: { pagination: { lastID: 1 << 30, limit: 20 } },
  })

  const [addVenus] = useMutation(ADD_VENUS)
  const [removeVenus] = useMutation(REMOVE_VENUS)
  const [updateVenus] = useMutation(UPDATE_VENUS)

  if (loading) return <Loading />

  const items = (data?.venusList?.edges ?? []).map((v: any) => ({
    id: v.id,
    uid: v.uid,
    source: v.source,
    name: v.name,
    avatar: v.avatar,
    bio: v.bio,
    initLoaded: v.initLoaded,
    rawData: v.rawData,
    remarks: v.remarks,
    priority: v.priority,
  }))

  return (
    <VenusList
      items={items}
      loading={loading}
      onAdd={async ({ uid, source }) => {
        try {
          await addVenus({ variables: { uid, source } })
          toast.success('Venus added')
          refetch()
        } catch (e: any) {
          toast.error(e.message)
        }
      }}
      onRemove={async (id) => {
        try {
          await removeVenus({ variables: { id } })
          toast.success('Venus removed')
          refetch()
        } catch (e: any) {
          toast.error(e.message)
        }
      }}
      onUpdate={async (id, data) => {
        try {
          await updateVenus({ variables: { id, ...data } })
          toast.success('Venus updated')
        } catch (e: any) {
          toast.error(e.message)
        }
      }}
      onLoadMore={() => {
        const edges = data?.venusList?.edges ?? []
        if (edges.length === 0) return
        const lastId = edges[edges.length - 1].id
        fetchMore({
          variables: { pagination: { lastID: lastId, limit: 20 } },
          updateQuery(prev: any, { fetchMoreResult }: any) {
            if (!fetchMoreResult) return prev
            return {
              venusList: {
                ...fetchMoreResult.venusList,
                edges: [...prev.venusList.edges, ...fetchMoreResult.venusList.edges],
              },
            }
          },
        })
      }}
    />
  )
}

export default function VenusPageClient({ userId }: { userId: string }) {
  return (
    <ApolloProvider client={client}>
      <VenusContent />
    </ApolloProvider>
  )
}
