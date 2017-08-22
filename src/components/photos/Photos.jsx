import React from 'react'
import styled from 'styled-components'
import { graphql, gql } from 'react-apollo'
import Loading from '../Loading'
import PhotoItem from './PhotoItem'
import fetchGirlsQuery from '../../graphql/fetchGirls.graphql'

const Container = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const gqlProps = {
  options: props => ({
    variables: {
      from: 1, take: 20, offset: 0
    },
    fetchPolicy: 'cache-and-network'
  }),
  props({ data: { girls, loading, fetchMore, variables } }) {
    return {
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

    renderPhotos() {
        return this.props.girls.map((pic, index) => {
            //wx3.sinaimg.cn/thumb150/bfc243a3gy1fisvjjysfsg20f00k0b2d
            const src = pic.img.indexOf('http') === 0 ? pic.img : `https://wx3.sinaimg.cn/thumble/${pic.img}`
            return (
                <PhotoItem
                    key={pic.id}
                    src={src}
                    desc={pic.desc}
                    onClick={() => { console.log('clicked') }}
                />
            )
        })
    }
    render() {
        if (this.props.loading) {
            return <Loading />
        }
        return (
            <Container>
                {this.renderPhotos()}
            </Container>
        )
    }
}

export default Photos