import React from 'react'
import Nav from '../../components/Nav'
import fetchGirlsQuery from '../../graphql/fetchGirls.graphql'
import { graphql, gql } from 'react-apollo'

const gqlProps = {
  options: props => ({
    variables: {
      from: 0, take: 20, offset: 0
    },
    fetchPolicy: 'cache-and-network'
  }),
  props({ data: { categories, girls, loading, fetchMore, variables } }) {
    return {
      categories,
      girls,
      loading,
      loadMore() {
        return fetchMore({
          query,
          variables: {
            from: variables.from, take: variables.take, offset: girls.length
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
          query,
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
class Girls extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  changeCategory = src => {
    if (this.props.loading) {
      return
    }
    this.props.loadNewCategories(src)
  }

  scrollHandle = () => {
    if (this.props.loading) {
      return
    }
    this.props.loadMore()
  }

  render() {
    const { categories, girls } = this.props
    // TODO: add girls
    return (
      <div>
        <Nav categories={categories || []} onChange={this.changeCategory} />

      </div>
    )
  }
}


export default Girls
