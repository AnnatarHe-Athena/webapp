import React from 'react'
import styled from 'styled-components'
import Preview from '../preview/Preview'
import { getRealSrcLink } from '../../utils/index'
import { report } from '../../utils/sentry'
import PropTypes from 'prop-types'

const Container = styled.picture`
  flex-grow: 1;
  img {
    width: 100%;
    border-radius: 4px;
    @media (max-width: 768px) {
      max-width: 25vw;
    }
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
    const { id, src, desc } = this.props
    const bmiddleSrc = getRealSrcLink(src)
    const previewData = this.state.visiable ? { id, src, desc } : null
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
  onClick: PropTypes.func
}

export default PhotoItem
