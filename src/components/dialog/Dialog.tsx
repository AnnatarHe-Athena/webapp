import React, { useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

const dom = document.querySelector('#preview')

type InnerDialogProps = {
  children: JSX.Element
  onClose: () => void
}

function InnerDialog(props: InnerDialogProps) {
  // useEffect(() => {
  //   const root = document.querySelector('#root')
  //   if (!root) {
  //     return
  //   }
  //   root.classList.add('gaussian-blur')
  //   return () => {
  //     root.classList.remove('gaussian-blur')
  //   }
  // }, [])

  const onClose = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as any).getAttribute('role') !== 'mask') {
      return
    }
    props.onClose()
  }, [props.onClose])
  return (
    <div
      className={'fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-30 backdrop-blur-lg z-50 with-fade-in'}
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
    , dom!)
}

export default Dialog
