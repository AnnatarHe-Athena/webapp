import React, { useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
const styles = require('./dialog.css')

const dom = document.querySelector('#preview')!

type InnerDialogProps = {
  children: JSX.Element
  onClose: () => void
}

function InnerDialog(props: InnerDialogProps) {
  useEffect(() => {
    const root = document.querySelector('#root')
    if (!root) {
      return
    }
    root.classList.add('gaussian-blur')
    return () => {
      root.classList.remove('gaussian-blur')
    }
  }, [])

  const onClose = useCallback((e) => {
    if (e.target.getAttribute('role') !== 'mask') {
      return
    }
    props.onClose()
  }, [props.onClose])

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ${styles.mask}`}
      onClick={onClose}
      role="mask">
      <CSSTransition
        classNames="fade"
        timeout={{
          exit: 350,
          enter: 350
        }}
      >
        {props.children}
      </CSSTransition>
    </div>
  )
}

function Dialog({ visible, ...data }: any) {
  if (!visible) { return null }
  return ReactDOM.createPortal(
    <InnerDialog {...data} />
    , dom)
}

export default Dialog
