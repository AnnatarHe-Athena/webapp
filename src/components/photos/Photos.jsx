import React from 'react'
import styled from 'styled-components'
// import { connect } from 'react-redux'
import { graphql, gql } from 'react-apollo'
import Loading from '../Loading'
import PhotoItem from './PhotoItem'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import Footer from '../footer/Footer'
import Button from '../button/Button'
import fetchGirlsQuery from '../../../../schema/fetchGirlsQuery.graphql'

const Container = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const PhotoLists = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`


const gqlProps = {
  options: props => ({
    variables: {
      from: props.categoryID, take: 20, offset: 0
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
// @connect(state => ({
//     categoryID: state.getIn(['app', 'categoryID'])
// }))
@graphql(fetchGirlsQuery, gqlProps)
class Photos extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.root = document.querySelector('.athena-obs-more')
        this.io = new IntersectionObserver(entries => {
            const e = entries[0]
            if (e.intersectionRatio <= 0 || this.props.loading) {
                return
            }
            this.props.loadMore()
        })
        this.io.observe(this.root)
    }
    componentWillUnmount() {
        this.io.unobserve(this.root)
        this.io.disconnect()
        this.root = null
        this.io = null
    }

    componentWillReceiveProps(np) {
        if (np.categoryID !== this.props.categoryID) {
            this.props.loadNewCategories(np.categoryID)
        }
    }

    renderPhotos() {

        if (!this.props.girls || this.props.girls.length === 0) {
            return null
        }

        return this.props.girls.map((pic, index) => {
            //wx3.sinaimg.cn/thumb150/bfc243a3gy1fisvjjysfsg20f00k0b2d
            const src = pic.img.indexOf('http') === 0 ? pic.img : `https://wx3.sinaimg.cn/bmiddle/${pic.img}`
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
        return (
            <Container>
                <ReactCSSTransitionGroup
                    component={PhotoLists}
                    transitionName="fade"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {this.renderPhotos()}
                </ReactCSSTransitionGroup>
                <Button size="large" color="red" disabled={this.props.loading} className="athena-obs-more"> Load More </Button>
                {this.props.loading && (<Loading />)}
            </Container>
        )
    }
}

export default Photos