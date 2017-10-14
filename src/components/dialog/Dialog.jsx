import React from 'react'
import styled from 'styled-components'
import Card from '../card/Card'
import { CSSTransitionGroup } from 'react-transition-group'

const Mask = styled.div`
  background-color: rgba(255, 255, 255, .8);
`

// TODO:
const Dialog = ({ visibility, children }) => {
  return (
    <CSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      { visibility ? children : null }
    </CSSTransitionGroup>
  )
}

export default Dialog
