import React from 'react'
import styled from 'styled-components'

const StatusContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    span {
        color: #fff !important;
        display: inline-block;
        padding-left: 1rem;
    }
`

function Status({ loading }) {
    return (
        <StatusContainer>
            <i className={"fa fa-lg " + (loading ? "fa-spinner fa-pulse fa-fw" : "fa-sign-in")} />
            <span>{loading ? 'Signing in' : 'Sign in'}</span>
        </StatusContainer>
    )
}

export default Status