import React from 'react'
import styled from 'styled-components'
import initialQuery from '../../../schema/categoriesQuery.graphql'
import { graphql, gql } from 'react-apollo'
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

@graphql(initialQuery)
class Root extends React.PureComponent {
    render() {
        const { children, params } = this.props
        return (
        <Container>
            <Header
                categoryID={params.categoryID || -1}
                categories={this.props.data.categories}
            />
            <BodyContainer>{ children }</BodyContainer>
        </Container>
        )
    }
}

export default Root
