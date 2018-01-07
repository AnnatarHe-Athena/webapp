import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { randomCategory } from '../constants/defaults'
import { maskCardStyles } from '../styles/variables'

const NavContainer = styled.nav`
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    ${maskCardStyles}
    margin: .5rem;
    a {
      display: block;
      padding: .5rem 1rem;
      text-align: center;
      width: 10rem;
      color: #fff;
      border-radius: 4px;
    }
  }

  li:hover {
    a {
      width: 12rem;
    }
  }
`

const Nav = ({ categories, onSelected }) => {
  const navs = categories.concat(randomCategory).map(c => {
    return (
      <li key={c.id} onClick={onSelected}>
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

Nav.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any)
}

export default Nav
