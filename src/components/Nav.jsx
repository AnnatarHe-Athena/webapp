import React from 'react'
import { Link } from 'react-router'
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
        a {
            display: block;
            padding: .5rem 1rem;
            border-radius: 4px;
        }
    }

    li:hover {
        background-color: rgba(255, 255, 255, .7);
    }
`

const Nav = ({ categories }) => {
    const navs = categories.map(c => {
        return (
            <li key={c.id}>
                <Link to={'/category/' + c.id }>{c.name}</Link>
            </li>
            )
    })
    return (
        <NavContainer>
            <ul>{navs}</ul>
        </NavContainer>
    )
}

export default Nav