import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useStore, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { profileGot } from '../../actions/auth'
import { useFetchProfileWithCollectionsQuery } from '../../schema/generated'

const STEP = 20

export function useMyProfile(userID: string) {
  const hasMore = useRef(true)
  const offset = useRef(STEP)
  const dispatch = useDispatch()

  const query = useFetchProfileWithCollectionsQuery({
      variables: {
        id: userID,
        from: 0,
        size: STEP,
        cursor: 1 << 30
      },
      onCompleted(result) {
        dispatch(profileGot(result.users))
        if (!result.collections) {
          hasMore.current = false
          return
        }
        if (result.collections?.edges.length === 0) {
          hasMore.current = false
          return
        }
        offset.current = offset.current + STEP
      }
    })
  const loadMore = useCallback(() => {
    if (!hasMore.current) {
      toast.error('🤷‍️️ 没有更多了')
      return
    }

    let cid: number = 1 << 30

    if (query.data?.collections && query.data.collections.edges.length > 0) {
      cid = query.data.collections.edges[query.data.collections.edges.length - 1].id
    }

    query.fetchMore({
      variables: {
        id: userID,
        from: 0,
        size: STEP,
        cursor: cid
      },
      updateQuery(pResult: any, options) {
        return {
          ...pResult,
          collections: {
            count: options.fetchMoreResult?.collections.count,
            edges: [
              ...(pResult.collections.edges ?? []),
              ...(options.fetchMoreResult?.collections.edges ?? [])
            ].reduce<any[]>((acc, x) => {
              if (!acc.find(z => z.id === x.id)) {
                acc.push(x)
              }
              return acc
            }, [])
          }
          // collections: [
          //   ...pResult.collections ?? [],
          //   ...options.fetchMoreResult?.collections ?? []
          // ]
        }
      }
    })


  }, [query.data])


  return {
    collections: query.data?.collections.edges ?? [],
    loadMore,
    loading: query.loading
  }
}
