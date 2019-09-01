import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import { profileGot } from '../../actions/auth'
import { TUser, TUserProfileWithCollection, Collection } from '../../types/user'
// @ts-ignore
import fetchProfileQuery from 'AthenaSchema/queries/profileWithCollection.graphql'
// @ts-ignore
import fetchCollectionQuery from 'AthenaSchema/queries/collections.graphql'

const STEP = 1

export function useMyProfile(userID: string) {
    const hasMore = useRef(true)
    const offset = useRef(STEP)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [collections, setCollections] = useState([] as Collection[])

    const client = useApolloClient()

    useEffect(() => {
        client.query({
            query: fetchProfileQuery,
            variables: {
                id: userID,
                from: 0,
                size: STEP
            }
        }).then(result => {
            console.log('result', result)
            const data = result.data as TUserProfileWithCollection
            dispatch(profileGot(data.users))
            setCollections(data.collections)

            setLoading(false)
        })
    }, [])

    const loadMore = useCallback(() => {
        if (loading) {
            return
        }
        if ( !hasMore.current) {

            toast.error('🤷‍️️ 没有更多了')
            return
        }
        setLoading(true)

        client.query({
            query: fetchCollectionQuery,
            variables: {
                id: userID,
                from: offset.current,
                size: STEP
            }
        }).then(result => {
            if (result.data.collections.length === 0) {
                hasMore.current = false
            }
            setCollections(collections.concat(result.data.collections))
            setLoading(false)
            offset.current = offset.current + STEP
        })
    }, [loading])

    return {
        collections,
        loadMore,
        loading: loading
    }
}

export function useUser(): TUser {
  const store = useStore()
  return store.getState().getIn(['profile', 'info']).toJS() as TUser
}
