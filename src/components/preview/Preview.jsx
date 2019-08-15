import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CommonDialog from '../dialog/Dialog'
import { withApollo } from 'react-apollo'
import { getRealSrcLink, getUserInfoURL, getTitleHref } from '../../utils/index'
import { getPermissionObj } from '../../utils/permission'
import { liteYellow } from '../../styles/variables'
import { CSSTransition } from 'react-transition-group'
import { HideUntilLoaded } from 'react-animation'
import addCollectionMutation from 'AthenaSchema/mutations/addCollection.graphql'
import removeGirlCellMutation from 'AthenaSchema/mutations/removeGirlCell.graphql'
import PropTypes from 'prop-types'

const Figure = styled.figure`
  border-radius: 4px;
  padding: 1rem;
  box-shadow: 0 0 0.5rem #888;
  background-color: rgba(255, 255, 255, .1);

  picture, img {
    max-height: 100vh;
    border-radius: 4px;
  }
  figcaption {
    text-align: right;
    font-size: 12px;
    padding: .1rem;
  }
`

const Extra = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .8));
  display: flex;
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  justify-content: space-around;
  align-items: center;
  z-index: 100;

  a, h2 {
    color: #fff;
    font-weight: 400;
    margin: 0;
  }
`

const ExtraButton = styled.button`
  border: 0;
  outline: 0;
  padding: .5rem;
  border-radius: 1px;
  color: #fff;
  font-weight: 300;
  box-shadow: 0 0 0.5rem #888;
  background: rgba(255,255,255,.1);
  margin-right: .5rem;
  transition: all .35s;
  font-size: 12px;

  &:hover {
    background: rgba(255,255,255,.3);
  }

  &:last-child {
    margin-right: 0;
  }

`

@connect(store => ({
  user: store.getIn(['profile', 'info'])
}), null)
@withApollo
class PreviewImage extends React.PureComponent {

  state = {
    extraVisiable: false
  }

  componentDidMount() {
    // send request to load this picture is liked or not
    this.changeExtraVisiable()
  }

  handleLike = () => {
    // TODO:
  }

  handleCollect = async () => {
    // TODO: show snakerbar
    // TODO: delete from local storage (redux store)
    await this.props.client.mutate({
      mutation: addCollectionMutation,
      variables: {
        cells: [~~this.props.id]
      }
    })
  }

  handleDelete = async () => {
    // TODO: show snakerbar
    await this.props.client.mutate({
      mutation: removeGirlCellMutation,
      variables: {
        cells: [~~this.props.id],
        toRemove: false
      }
    })

  }

  changeExtraVisiable = () => {
    this.setState(s => ({ extraVisiable: !s.extraVisiable }))
  }

  componentWillUnmount() {
    this.changeExtraVisiable()
  }

  render() {
    const { src, desc, fromID, fromURL, content } = this.props
    if (!src) {
      return null
    }

    const { softRemove } = getPermissionObj(this.props.user.toJS())

    const leftUserInfo = fromID ? (
      <div>
        <a href={getUserInfoURL(fromID, fromURL)} target="_blank">我的信息</a>
      </div>
    ) : null

    const middleTitle = (
      <div>
        <a href={getTitleHref(fromURL)} target="_blank"><h2>{desc || '主题'}</h2></a>
      </div>
    )

    const bigSrc = getRealSrcLink(src, 'large')
    return (
      <div>
        <Extra>
            {leftUserInfo}
            {middleTitle}
            <div>
              <ExtraButton onClick={this.handleCollect}>Collect</ExtraButton>
              { softRemove && <ExtraButton onClick={this.handleDelete}>Delete</ExtraButton> }
            </div>
          </Extra>
        <Figure>
          <HideUntilLoaded imageToLoad={bigSrc}>
            <picture onClick={this.props.onClose}>
              <source srcSet={bigSrc} />
              <img src={bigSrc} alt={desc} />
              <figcaption>{content}</figcaption>
            </picture>
          </HideUntilLoaded>
        </Figure>
      </div>
    )
  }
}

const Preview = ({ data, visible, onClose }) => {
  return (
    <CommonDialog visible={visible} onClose={onClose}>
      <PreviewImage {...data} onClose={onClose}/>
    </CommonDialog>
  )
}

PreviewImage.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  desc: PropTypes.string,
  onClick: PropTypes.func,
  client: PropTypes.any
}

export default Preview
