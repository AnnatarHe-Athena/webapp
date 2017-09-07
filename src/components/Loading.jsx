import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
`

const Icon = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    box-shadow: 0 0 1rem #888;
    border-radius: 4px;

    span {
        margin-top: 1rem;
    }
`

const Loading = () => {
    return (
         <Container>
            <Icon>
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
                <span> Loading... </span>
            </Icon>
         </Container>
    )
}

export default Loading