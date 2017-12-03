import React from 'react'
import styled from 'styled-components'
import Preview from '../preview/Preview'
import { getRealSrcLink } from '../../utils/index'
import { report } from '../../utils/sentry'
import PropTypes from 'prop-types'

const Container = styled.picture`
  flex-grow: 1;

  @media (min-width: 768px) {
    max-width: 24vw;
  }
  img {
    width: 100%;
    border-radius: 4px;
  }
`

class PhotoItem extends React.PureComponent {
  state = {
    visiable: false
  }

  togglePreview = () => {
    this.setState(ps => ({ visiable: !ps.visiable }))
  }

  componentDidCatch(err, info) {
    report(err, info)
  }

  render() {
    const { id, src, desc, fromID, fromURL } = this.props
    const bmiddleSrc = getRealSrcLink(src)
    const previewData = this.state.visiable ? { id, src, desc, fromID, fromURL } : null
    return (
      <Container onClick={() => { this.setState({ visiable: ! this.state.visiable })}}>
        <source srcSet={bmiddleSrc} />
        <img src={bmiddleSrc} alt={desc} />
        {/*<span>{desc}</span>*/}
        <Preview data={previewData} />
      </Container>
    )
  }
}

PhotoItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  desc: PropTypes.string,
  onClick: PropTypes.func,
  fromURL: PropTypes.string,
  fromID: PropTypes.string
}

export default PhotoItem
