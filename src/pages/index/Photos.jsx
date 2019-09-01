import React from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import PhotoList from 'AthenaComponents/photos/Photos'
import fetchGirlsQuery from 'AthenaSchema/fetchGirlsQuery.graphql'
import { randomCategory, legacyCategory } from '../../constants/defaults'
import { getPermissionObj } from '../../utils/permission'
import { STORAGE_OFFSET_KEY } from '../../components/nav-offset-input/index';

const gqlProps = {
  options: props => {
    const { categories } = props
    let category = props.categoryID
    let last = 1 << 30
    if (category === randomCategory.id) {
      const randomIndexItem = Math.floor(Math.random() * (categories.size - 1))
      category = categories.getIn([randomIndexItem, 'id'])
      last = Math.floor(Math.random() * (~~categories.getIn([randomIndexItem, 'count']) - 20))
    }
    return {
      variables: {
        from: category || 1, take: 20,
        hideOnly: false,
        last: last.toString()
      },
      fetchPolicy: 'cache-and-network'
    }
  },
  props({ data: { girls, loading, fetchMore, variables }, ownProps: { categories, categoryID } }) {
    return {
      girls,
      loading,
      categories,
      loadMore() {
        // if is random category, just random params
        let from = categoryID
        let offset = girls.length
        if (from === randomCategory.id) {
          const randomIndexItem = Math.floor(Math.random() * (categories.size - 1))
          from = categories.getIn([randomIndexItem, 'id'])
          offset = Math.floor(Math.random() * (categories.getIn([randomIndexItem, 'count']) - variables.take))
          offset = offset < 0 ? 0 : offset
        }

        const storageOffset = sessionStorage.getItem(STORAGE_OFFSET_KEY)
        if (storageOffset) {
          offset += ~~storageOffset
        }

        const hideOnly = from === legacyCategory.id
        return fetchMore({
          fetchGirlsQuery,
          variables: {
            from, take: variables.take,
            hideOnly,
            last: girls[girls.length - 1].id
          },
          updateQuery: (pResult, { fetchMoreResult }) => {
            return {
              girls: pResult.girls.concat(fetchMoreResult.girls)
            }
          }
        })
      },
      loadNewCategories(from) {
        // if is random category, just random params
        let offset = 0
        if (from.toString() === randomCategory.id) {
          const randomIndexItem = Math.floor(Math.random() * (categories.size - 1))
          from = categories.getIn([randomIndexItem, 'id'])
          offset = Math.floor(Math.random() * (categories.getIn([randomIndexItem, 'count']) - variables.take))
        }

        offset = offset < 0 ? 0 : offset
        const hideOnly = from === legacyCategory.id
        return fetchMore({
          fetchGirlsQuery,
          variables: { from, take: variables.take, offset, hideOnly },
          updateQuery(pResult, { fetchMoreResult }) {
            return {
              variables: { ...variables, from, offset: 20 },
              girls: fetchMoreResult.girls
            }
          }
        })
      }

    }
  }
}

@connect(store => ({
  categories: store.getIn(['app', 'categories']),
  canRemove: getPermissionObj(store.getIn(['profile', 'info']).toJS()).remove
}))
@graphql(fetchGirlsQuery, gqlProps)
class Photos extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
    categories: PropTypes.instanceOf(Immutable.List),
    girls: PropTypes.arrayOf(PropTypes.any),
    loadMore: PropTypes.func,
    loadNewCategories: PropTypes.func,
    categoryID: PropTypes.number
  }

  render() {
    const { loading, loadMore, girls, canRemove, categoryID } = this.props
    return (
      <PhotoList
        loading={loading}
        loadMore={loadMore}
        cells={girls}
        forceDeleteable={canRemove && categoryID === legacyCategory.id}
      />
    )
  }
}

export default Photos
