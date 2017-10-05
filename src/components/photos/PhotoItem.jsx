import React from 'react'
import styled from 'styled-components'
import { getRealSrcLink } from '../../utils/index'

const Container = styled.picture`
  flex-grow: 1;
  img {
    width: 100%;
  }
`

const PhotoItem = ({ id, src, desc, onClick }) => {
  //wx3.sinaimg.cn/thumb150/bfc243a3gy1fisvjjysfsg20f00k0b2d
  const bmiddleSrc = getRealSrcLink(src)
  return (
    <Container onClick={() => { onClick(id, src, desc) }}>
      <source srcSet={bmiddleSrc} />
      <img src={bmiddleSrc} alt={desc} />
      {/*<span>{desc}</span>*/}
    </Container>
  )
}

export default PhotoItem
