import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { updateCategories } from '../actions/category'
import initialQuery from 'AthenaSchema/categoriesQuery.graphql'

import { liteYellow, liteBlue } from '../styles/variables'

import Header from './header/Header'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100vh;
    background: linear-gradient(45deg, ${liteYellow}, ${liteBlue});
`

const BodyContainer = styled.div`
    display: flex;
    flex: 1;
`

@connect(state => ({
  categories: state.getIn(['app', 'categories'])
}), dispatch => ({
  updateCategories(categories) { return dispatch(updateCategories(categories)) }
}))
@withApollo
class Root extends React.PureComponent {
  componentDidMount() {
    this.props.client.query({
      query: initialQuery
    }).then(result => {
      this.props.updateCategories(result.data.categories)
    })
  }
  render() {
    const { children, params } = this.props
    return (
      <Container>
        <Header
          categoryID={params.categoryID || -1}
          categories={this.props.categories.toJS()}
        />
        <CSSTransitionGroup
          component={BodyContainer}
          transitionName="fade"
          transitionEnterTimeout={350}
          transitionLeaveTimeout={350}
        >
          {React.cloneElement(children, {
            key: location.pathname
          })}
        </CSSTransitionGroup>
      </Container>
    )
  }
}

Root.propTypes = {
  client: PropTypes.any.isRequired,
  updateCategories: PropTypes.func,
  children: PropTypes.elements,
  params: PropTypes.any,
  categories: PropTypes.arrayOf(PropTypes.any)
}


export default Root
