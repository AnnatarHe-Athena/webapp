import React from 'react'
import fetchGirlsQuery from '../../graphql/fetchGirls.graphql'
import { graphql, gql } from 'react-apollo'

const Container = styled.main`
    display: flex;
    flex-wrap: wrap;
`

const gqlProps = {
  options: props => ({
    variables: {
      from: 1, take: 20, offset: 0
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
class Photos extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Container>
                todo
            </Container>
        )
    }
}

export default Photos