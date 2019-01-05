import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Card from '../card/Card'
import { CSSTransition } from 'react-transition-group'

const Mask = styled.div`
  background-color: rgba(0, 0, 0, .3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const dom = document.querySelector('#preview')

class InnerDialog extends React.PureComponent {
  componentDidMount() {
    document.querySelector('#root').classList.add('gaussian-blur')
  }

  componentWillUnmount() {
    document.querySelector('#root').classList.remove('gaussian-blur')
  }

  onClose = e => {
    if (e.target.getAttribute('role') === 'mask') {
      this.props.onClose()
    }
  }

  render() {
    return (
      <Mask onClick={this.onClose} role="mask">
        <CSSTransition
          classNames="fade"
          timeout={{
            exit: 350,
            enter: 350
          }}
        >
          {this.props.children}
        </CSSTransition>
      </Mask>
    )
  }
}

const Dialog = ({ visible, ...data}) => {
  if (! visible) { return null }
  return ReactDOM.createPortal(
    <InnerDialog {...data} />
    , dom)
}

Dialog.propTypes = {
  visibility: PropTypes.bool,
  children: PropTypes.element
}

export default Dialog
