import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { profileGot } from '../../actions/auth'
import { TUser, TUserProfileWithCollection, Collection } from '../../types/user'
// @ts-ignore
import fetchProfileQuery from 'AthenaSchema/queries/profileWithCollection.graphql'
// @ts-ignore
import fetchCollectionQuery from 'AthenaSchema/queries/collections.graphql'

const STEP = 20

export function useMyProfile(userID: string) {
  const hasMore = useRef(true)
  const offset = useRef(STEP)
  const dispatch = useDispatch()

  const client = useApolloClient()

  const query = useQuery<TUserProfileWithCollection>(fetchProfileQuery, {
    variables: {
      id: userID,
      from: 0,
      size: STEP
    },
    onCompleted(result) {
      if (result.collections?.length === 0) {
        hasMore.current = false
      }
      offset.current = offset.current + STEP

      console.log('on completed', dispatch, result)
      dispatch(profileGot(result.users))
    }
  })

  console.log('query.data', query.data)

  // useEffect(() => {
  //   client.query({
  //     query: fetchProfileQuery,
  //     variables: {
  //       id: userID,
  //       from: 0,
  //       size: STEP
  //     }
  //   }).then(result => {
  //     console.log('result', result)
  //     const data = result.data as TUserProfileWithCollection
  //     dispatch(profileGot(data.users))
  //     setCollections(data.collections || [])
  //     setLoading(false)
  //   })
  // }, [])

  const loadMore = useCallback(() => {
    if (!hasMore.current) {
      toast.error('🤷‍️️ 没有更多了')
      return
    }

    query.fetchMore({
      variables: {
        id: userID,
        from: offset.current,
        size: STEP
      },
      updateQuery(pResult, options) { 
        return {
          ...pResult,
          collections: [
            ...pResult.collections ?? [],
            ...options.fetchMoreResult?.collections ?? []
          ]
        }
      }
    })


  }, [query.data])


  return {
    collections: query.data?.collections ?? [],
    loadMore,
    loading: query.loading
  }
}
