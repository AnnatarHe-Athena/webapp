import React, { ComponentProps, useCallback } from 'react'
import CommonDialog from '../dialog/Dialog'
import PreviewImage from './image.preview'

interface PreviewProps<T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> {
  visible: boolean
  onClose: () => void
  data: ComponentProps<T>
}

function Preview({ data, visible, onClose }: PreviewProps<typeof PreviewImage>) {
  return (
    <CommonDialog visible={visible} onClose={onClose}>
      <PreviewImage {...data} onClose={onClose} />
    </CommonDialog>
  )
}

export default Preview
