import React, { useState } from 'react'
import styled from 'styled-components'
import Preview from '../preview/Preview'
import { getRealSrcLink, getAESIVFromUserEmail } from '../../utils/index'
import { useImageDestLink } from '../../hooks/useImageDestLink'
import HideUntilLoaded from '../HideUntilLoaded'

const Container = styled.picture`
  flex-grow: 1;
  // min-width: 10rem;
  // min-height: 10rem;

  @media (min-width: 768px) {
    max-width: 24vw;
  }
  img {
    width: 400px;
    height: 500px;
    border-radius: 4px;
  }
`

type PhotoItemProps = {
  id: number
  src: string
  desc: string
  fromURL: string
  fromID: string
  content: string
  forceDeleteable: boolean
}

function PhotoItem(props: PhotoItemProps) {
  const {
    id,
    src,
    desc,
    fromID,
    fromURL,
    content
  } = props

  const [vis, setVis] = useState(false)
  const basedLink = useImageDestLink(src)
  const bmiddleSrc = getRealSrcLink(atob(basedLink))

  return (
    <Container>
      <HideUntilLoaded imageToLoad={bmiddleSrc}>
        <source
          srcSet={bmiddleSrc}
          onClick={() => setVis(true)}
        />
        <img
          src={bmiddleSrc}
          alt={desc}
          onClick={() => setVis(true)}
          crossOrigin="anonymous"
        />
      </HideUntilLoaded>
      {/*<span>{desc}</span>*/}
      <Preview
        data={{ id, src, desc, fromID, fromURL, content }}
        visible={vis}
        onClose={() => setVis(false)}
      />
    </Container>
  )
}

export default PhotoItem
