import React from 'react'
import styled from 'styled-components'

const NavContainer = styled.nav`
    ul {
        display: flex;
        align-items: center;
        justify-content: center;
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li {
        margin: 0 .5rem;
        background-color: rgba(255, 255, 255, .8);
        padding: .5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
    }

    li:hover {
        background-color: rgba(255, 255, 255, .7);
    }
`

const Nav = ({ categories, onChange }) => {
    const navs = categories.map(c => {
        return (<li key={c.id} onClick={() => { onChange(c.id)}}>{c.name}</li> )
    })
    return (
        <NavContainer>
            <ul>{navs}</ul>
        </NavContainer>
    )
}

export default Nav