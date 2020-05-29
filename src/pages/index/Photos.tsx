import React from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { legacyCategory } from '../../constants/defaults'
import { getPermissionObj } from '../../utils/permission'
import { STORAGE_OFFSET_KEY } from '../../components/nav-offset-input/index'
import PhotoList from '../../components/photos/Photos'
import { CellItem, TCellsResponse } from "../../types/cell"
import { AppStore } from '../../reducers'
import { TUser } from '../../types/user'

const fetchGirlsQuery = require('../../../../schema/fetchGirlsQuery.graphql')

type PhotosProps = {
  categoryID: number
}

function Photos(props: PhotosProps) {
  const user = useSelector<AppStore, TUser>(s => s.profile.info)

  const query = useQuery<TCellsResponse>(fetchGirlsQuery, {
    variables: {
      from: props.categoryID || 1, take: 17,
      hideOnly: false,
      last: (1 << 30).toString()
    },
  })

  const loadMore = () => {
    const cells = query.data?.girls || []
    if (cells.length === 0) {
      return
    }
    let lastId = cells[cells.length - 1].id
    const storageLastId = sessionStorage.getItem(STORAGE_OFFSET_KEY)

    if (storageLastId && (~~lastId < ~~storageLastId)) {
      lastId = storageLastId
    }
    query.fetchMore({
      variables: {
        from: props.categoryID || 1, take: 20,
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
      cells={query.data?.girls ?? []}
      forceDeleteable={getPermissionObj(user).remove && props.categoryID.toString() === legacyCategory.id}
    />
  )
}

export default Photos
