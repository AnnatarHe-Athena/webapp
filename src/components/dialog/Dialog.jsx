import React from 'react'
import styled from 'styled-components'
import Card from '../card/Card'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Mask = styled.div`
  background-color: rgba(255, 255, 255, .8);
`

// TODO:
const Dialog = ({ visibility, children }) => {
  return (
    <ReactCSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      { visibility ? children : null }
    </ReactCSSTransitionGroup>
  )
}

export default Dialog
