import React from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { randomCategory } from '../constants/defaults'
import { maskCardStyles } from '../styles/variables'
import NavOffsetInput from './nav-offset-input/index';

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
  const navs = categories.map(c => {
    if (__DEV__) {
      c.name = "hello." + c.id
    }
    return (
      <li key={c.id} onClick={onSelected}>
        <Link to={'/category/' + c.id }>{c.name}</Link>
      </li>
    )
  })
  return (
    <NavContainer>
      <NavOffsetInput />
      <ul>{navs}</ul>
      <div className="absolute bottom-0 right-0 mr-8 mb-8">
        <Link to={'/about'} className="text-sm text-blue-300">关于</Link>
      </div>
    </NavContainer>
  )
}

Nav.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any)
}

export default Nav
