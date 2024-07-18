import React from 'react'
import styled from 'styled-components'
import { maskCardStyles } from './styles/variables'
import NavOffsetInput from './nav-offset-input/index'
import { __DEV__ } from './constant'
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

function Nav({ categories, onSelected }: NavProps) {
  const navs = categories.map(c => {
    return (
      <li key={c.id} onClick={onSelected}>
        <Link to={'/category/' + c.id}>
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
      <ul className='grid grid-cols-3 md:grid-cols-2 gap-4'>{navs}</ul>
    </NavContainer>
  )
}

export default Nav
