import React from 'react'
import styled from 'styled-components'
import Preview from '../preview/Preview'
import { getRealSrcLink } from '../../utils/index'
import { report } from '../../utils/sentry'
import PropTypes from 'prop-types'

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

class PhotoItem extends React.PureComponent {
  state = {
    visible: false
  }

  togglePreview = () => {
    this.setState(ps => ({ visible: !ps.visible }))
  }

  componentDidCatch(err, info) {
    report(err, info)
  }

  render() {
    const { id, src, desc, fromID, fromURL, content, forceDeleteable } = this.props
    // TODO: forceDeleteable 真正删除文件，从七牛里面删掉

    const bmiddleSrc = getRealSrcLink(src)
    return (
      <Container>
        <source srcSet={bmiddleSrc} onClick={() => { this.setState({ visible: true })}} />
        <img src={bmiddleSrc} alt={desc}  onClick={() => { this.setState({ visible: true })}}/>
        {/*<span>{desc}</span>*/}
        <Preview data={{ id, src, desc, fromID, fromURL, content }} visible={this.state.visible} onClose={this.togglePreview} />
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
