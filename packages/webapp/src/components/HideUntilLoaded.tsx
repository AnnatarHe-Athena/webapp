import React from 'react'

type HideUntilLoadedProps = {
  imageToLoad: string,
  children: React.ReactElement
}

function HideUntilLoaded(props: HideUntilLoadedProps) {
  return props.children
}

export default HideUntilLoaded
