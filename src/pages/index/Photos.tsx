import React from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@apollo/client'
import { legacyCategory } from '../../constants/defaults'
import { getPermissionObj } from '../../utils/permission'
import PhotoList from '../../components/photos/Photos'
import { AppStore } from '../../reducers'
import { TUser } from '../../types/user'

import fetchGirlsQueryQuery from '../../schema/fetchGirlsQuery.graphql'
import { fetchGirlsQuery, fetchGirlsQueryVariables } from '../../schema/_g/fetchGirlsQuery'
import { useAtomValue } from 'jotai'
import { beautyListFetchOffset } from '../../store/beauty'

type PhotosProps = {
  categoryID: number
}

function Photos(props: PhotosProps) {
  const user = useSelector<AppStore, TUser>(s => s.profile.info)
  const offset = useAtomValue(beautyListFetchOffset)

  const query = useQuery<fetchGirlsQuery, fetchGirlsQueryVariables>(fetchGirlsQueryQuery, {
    variables: {
      from: ~~props.categoryID || 1, take: 17,
      hideOnly: false,
      last: offset ? offset.toString() : (1<<30).toString()
    },
  })

  const loadMore = () => {
    const cells = query.data?.girls ?? []
    if (cells.length === 0) {
      return
    }
    let lastId = cells[cells.length - 1].id
    if (offset && (~~lastId) > offset) {
      lastId = offset.toString()
    }
    query.fetchMore({
      variables: {
        from: ~~props.categoryID || 1, take: 20,
        hideOnly: false,
        last: lastId
      },
      updateQuery(pResult, options) {
        return {
          girls: [
            ...pResult.girls,
            ...options.fetchMoreResult?.girls || []
          ]
        }
       }
    })
  }

  return (
    <PhotoList
      loading={query.loading}
      loadMore={loadMore}
      cells={Array.from(query.data?.girls ?? [])}
      forceDeleteable={getPermissionObj(user).remove && props.categoryID.toString() === legacyCategory.id}
    />
  )
}

export default Photos
