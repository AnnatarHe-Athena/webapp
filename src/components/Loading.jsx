import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-spinkit'

const spinnerNames = [
  'circle',
  'cube-grid',
  'wave',
  'folding-cube',
  'three-bounce',
  'double-bounce',
  'wandering-cubes',
  'chasing-dots',
  'rotating-plane',
  'pulse',
  'wordpress'
]

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

// loading types
const Loading = () => {
  const loadingName = spinnerNames[Math.ceil(Math.random() * spinnerNames.length) + 1]
  return (
    <Container>
      <Spinner name={loadingName} />
    </Container>
   )
}


/*
  <icon>
      <i classname="fa fa-spinner fa-pulse fa-3x fa-fw" />
      <span> loading... </span>
  </icon>
*/

export default Loading
