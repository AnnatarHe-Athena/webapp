import React from 'react'
import styled from 'styled-components'

const Container = styled.picture`
  flex-grow: 1;
  img {
    width: 100%;
  }
`

const PhotoItem = ({ src, desc, onClick }) => {
  if (process.env.NODE_ENV !=== 'production') {
    src = 'http://via.placeholder.com/350x150'
  }
  return (
    <Container onClick={onClick}>
      <source srcSet={src} />
      <img src={src} alt={desc} />
      {/*<span>{desc}</span>*/}
    </Container>
  )
}

export default PhotoItem
