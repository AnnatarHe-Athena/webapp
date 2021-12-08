import React from 'react'
import styled from 'styled-components'
import { maskCardStyles } from '../styles/variables'
import NavOffsetInput from './nav-offset-input/index'
import { __DEV__ } from '../constants/app'
import { Link } from 'react-router-dom'

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

type NavProps = {
  categories: {
    id: string,
    name: string
  }[],
  onSelected: () => void
}

function Nav ({ categories, onSelected }: NavProps) {
  const navs = categories.map(c => {
    return (
      <li key={c.id} onClick={onSelected}>
        <Link to={'/category/' + c.id }>
          {
            __DEV__ ? `hello.${c.id}` : c.name
          }
          </Link>
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

export default Nav
