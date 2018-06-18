import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import PhotoList from 'AthenaComponents/photos/Photos'
import fetchGirlsQuery from 'AthenaSchema/fetchGirlsQuery.graphql'
import { randomCategory, legacyCategory } from '../../constants/defaults'
import { getPermissionObj } from '../../utils/permission'

const Container = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const gqlProps = {
  options: props => ({
    variables: {
      from: props.categoryID || 1, take: 20, offset: 0,
      hideOnly: false
    },
    fetchPolicy: 'cache-and-network'
  }),
  props({ data: { girls, loading, fetchMore, variables }, ownProps: { categories} }) {
    return {
      girls,
      loading,
      categories,
      loadMore() {
        // if is random category, just random params
        let from = variables.from
        let offset = girls.length
        if (from === randomCategory.id) {
          const randomIndexItem = Math.floor(Math.random() * (categories.size - 1))
          from = categories.getIn([randomIndexItem, 'id'])
          offset = Math.floor(Math.random() * (categories.getIn([randomIndexItem, 'count']) - variables.take))
          offset = offset < 0 ? 0 : offset
        }
        const hideOnly = from === legacyCategory.id
        return fetchMore({
          fetchGirlsQuery,
          variables: {
            from, take: variables.take, offset,
            hideOnly
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
        if (from === randomCategory.id) {
          const randomIndexItem = Math.floor(Math.random() * (categories.size - 1))
          from = categories.getIn([randomIndexItem, 'id'])
          offset = Math.floor(Math.random() * (categories.getIn([randomIndexItem, 'count'])- variables.take))
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

  state = {
    categoryID: -1
  }

  componentWillReceiveProps(np) {
    if (np.categoryID !== this.state.categoryID) {
      this.props.loadNewCategories(np.categoryID)
      this.setState({
        categoryID: np.categoryID
      })
    }
  }

  static getDerivedStateFromProps(props) {
    console.log('getDerivedStateFromProps', props)
  }

  render() {
    const { loading, loadMore, girls, canRemove, categoryID } = this.props
    return (
      <Container>
        <PhotoList
          loading={loading}
          loadMore={loadMore}
          cells={girls}
          forceDeleteable={canRemove && categoryID === legacyCategory.id}
        />
      </Container>
    )
  }
}

Photos.propTypes = {
  loading: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.any),
  girls: PropTypes.arrayOf(PropTypes.any),
  loadMore: PropTypes.func,
  loadNewCategories: PropTypes.func,
  categoryID: PropTypes.number
}

export default Photos
