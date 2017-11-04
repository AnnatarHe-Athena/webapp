import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import { updateCategories } from '../actions/category'
import initialQuery from '../../../schema/categoriesQuery.graphql'

import Header from './header/Header'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100vh;
    background: linear-gradient(to bottom, #df3d46, #ef9ea3);
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
        <BodyContainer>{ children }</BodyContainer>
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
