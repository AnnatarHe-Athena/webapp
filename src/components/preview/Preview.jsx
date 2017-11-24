import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import { getRealSrcLink } from '../../utils/index'
import { liteYellow } from '../../styles/variables'
import { CSSTransitionGroup } from 'react-transition-group'
import addCollectionMutation from 'AthenaSchema/mutations/addCollection.graphql'
import removeGirlCellMutation from 'AthenaSchema/mutations/removeGirlCell.graphql'
import PropTypes from 'prop-types'

const dom = document.querySelector('#preview')

const Mask = styled.div`
  background-color: rgba(0, 0, 0, .7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Dialog = styled.div`
  background-color: #888;
  border-radius: 4px;

  picture, img {
    max-height: 100vh;
    border-radius: 4px;
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
  justify-content: flex-end;
  align-items: center;
`

const ExtraButton = styled.button`
  border: 0;
  outline: 0;
  background-color: ${liteYellow};
  padding: .5rem;
  border-radius: 5px;
  color: #222;


  margin-right: .5rem;

  &:last-child {
    margin-right: 0;
  }

`

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
        cells: [~~this.props.id]
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
    const { src, desc } = this.props

    const bigSrc = getRealSrcLink(src, 'large')
    return (
      <Mask>
        <CSSTransitionGroup
          component="div"
          transitionName="slide"
          transitionEnterTimeout={350}
          transitionLeaveTimeout={350}
        >
          {this.state.extraVisiable ? <Extra>
            {/*<button>Like</button>*/}
            <ExtraButton onClick={this.handleCollect}>Collect</ExtraButton>
            <ExtraButton onClick={this.handleDelete}>Delete</ExtraButton>
          </Extra> : null }
        </CSSTransitionGroup>
        <Dialog>
          <picture>
            <source srcSet={bigSrc} />
            <img src={bigSrc} alt={desc} />
          </picture>
        </Dialog>
      </Mask>
    )
  }
}

const Preview = ({ data }) => {
  if (!data) { return null }

  const { id, src, desc } = data

  if (!id || !src || !desc) {
    return null
  }

  return ReactDOM.createPortal(
    <PreviewImage {...data} />
    , dom)
}

PreviewImage.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  desc: PropTypes.string,
  onClick: PropTypes.func,
  client: PropTypes.any
}

export default Preview
