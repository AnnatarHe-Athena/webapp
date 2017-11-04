import React from 'react'
import styled from 'styled-components'
import { getRealSrcLink } from '../../utils/index'
import PropTypes from 'prop-types'

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

PhotoItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  desc: PropTypes.string,
  onClick: PropTypes.func
}

export default PhotoItem
