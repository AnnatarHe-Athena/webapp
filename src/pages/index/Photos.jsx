import React from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import PhotoList from 'AthenaComponents/photos/Photos'
import fetchGirlsQuery from 'AthenaSchema/fetchGirlsQuery.graphql'

const Container = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const gqlProps = {
  options: props => ({
    variables: {
      from: props.categoryID, take: 20, offset: 0,
      hideOnly: false
    },
    fetchPolicy: 'cache-and-network'
  }),
  props({ data: { girls, loading, fetchMore, variables } }) {
    return {
      girls,
      loading,
      loadMore() {
        return fetchMore({
          fetchGirlsQuery,
          variables: {
            from: variables.from, take: variables.take, offset: girls.length,
            hideOnly: false
          },
          updateQuery: (pResult, { fetchMoreResult }) => {
            return {
              girls: pResult.girls.concat(fetchMoreResult.girls)
            }
          }
        })
      },
      loadNewCategories(from) {
        return fetchMore({
          fetchGirlsQuery,
          variables: {
            from , take: variables.take, offset: 0
          },
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

@graphql(fetchGirlsQuery, gqlProps)
class Photos extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(np) {
    if (np.categoryID !== this.props.categoryID) {
      this.props.loadNewCategories(np.categoryID)
    }
  }

  render() {
    const { loading, loadMore, girls } = this.props
    return (
      <Container>
        <PhotoList
          loading={loading}
          loadMore={loadMore}
          cells={girls}
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
