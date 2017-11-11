import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Card from '../card/Card'
import { CSSTransitionGroup } from 'react-transition-group'

const Mask = styled.div`
  background-color: rgba(255, 255, 255, .8);
`

// TODO: build a common dialog
const Dialog = ({ visibility, children }) => {
  return (
    <CSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      <Mask><Card /></Mask>
      { visibility ? children : null }
    </CSSTransitionGroup>
  )
}

Dialog.propTypes = {
  visibility: PropTypes.bool,
  children: PropTypes.elements
}

export default Dialog
