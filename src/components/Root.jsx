import React from 'react'
import styled from 'styled-components'
import Header from './header/Header'

const Container = styled.div`

`

function Root({ children }) {
    return (
        <Container>
            <Header />
            <div>{ children }</div>
        </Container>
    )
}

export default Root
