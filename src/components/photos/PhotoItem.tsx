import React from 'react'
import styled from 'styled-components'
import Preview from '../preview/Preview'
import { getRealSrcLink } from '../../utils/index'
import { HideUntilLoaded } from 'react-animation'

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

class PhotoItem extends React.PureComponent<PhotoItemProps,any> {
  state = {
    visible: false
  }

  togglePreview = () => {
    this.setState((ps: any) => ({ visible: !ps.visible }))
  }

  render() {
    const { id, src, desc, fromID, fromURL, content, forceDeleteable } = this.props
    // TODO: forceDeleteable 真正删除文件，从七牛里面删掉

    const bmiddleSrc = getRealSrcLink(src)
    return (
      <Container>
        <HideUntilLoaded imageToLoad={bmiddleSrc}>
          <source srcSet={bmiddleSrc} onClick={() => { this.setState({ visible: true })}} />
          <img
            src={bmiddleSrc}
            alt={desc}
            onClick={() => { this.setState({ visible: true })}}
            crossOrigin="anonymous"
            referrerPolicy={bmiddleSrc?.startsWith('https://cdn.annatarhe.com') ? 'origin' : 'no-referrer'}
          />
        </HideUntilLoaded>
        {/*<span>{desc}</span>*/}
        <Preview data={{ id, src, desc, fromID, fromURL, content }} visible={this.state.visible} onClose={this.togglePreview} />
      </Container>
    )
  }
}

export default PhotoItem
