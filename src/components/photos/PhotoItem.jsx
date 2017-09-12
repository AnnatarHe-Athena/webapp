import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  flex-grow: 1;
  img {
    width: 100%;
  }
`

const PhotoItem = ({ src, desc, onClick }) => {
  return (
    <Container onClick={onClick}>
      <img src={src} />
      {/*<span>{desc}</span>*/}
    </Container>
  )
}

export default PhotoItem
