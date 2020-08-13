import React, { useState } from 'react'
import styled from 'styled-components'
import Preview from '../preview/Preview'
import { getRealSrcLink, getAESKeyFromUserEmail, decryptData, getAESIVFromUserEmail } from '../../utils/index'
import { HideUntilLoaded } from 'react-animation'
import { useSelector } from 'react-redux'
import { AppStore } from '../../reducers'

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

function useImageDestLink(src: string) {
  const email = useSelector<AppStore, string | undefined>(s => s.profile.info.email)

  if (!email) {
    return btoa('https://picsum.photos/200/300')
  }

  const key = getAESKeyFromUserEmail(email)
  const iv = getAESIVFromUserEmail(email)
  
  return decryptData(key, src)
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
  const bmiddleSrc = getRealSrcLink(atob(basedLink.trim()))

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
          referrerPolicy={bmiddleSrc?.startsWith('https://cdn.annatarhe.com') ? 'origin' : 'no-referrer'}
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
