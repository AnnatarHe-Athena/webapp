import React from 'react'
import styled from 'styled-components'
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

function Root({ children }) {
    return (
        <Container>
            <Header />
            <BodyContainer>{ children }</BodyContainer>
        </Container>
    )
}

export default Root
