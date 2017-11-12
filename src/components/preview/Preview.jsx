import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import { getRealSrcLink } from '../../utils/index'
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
  max-width: 80%;
  max-height: 80%;
  box-shadow: 0 0 .5rem #888;
  padding: 1rem;
  background-color: #888;
  border-radius: 4px;
`

const Extra = styled.div`
`

@withApollo
class PreviewImage extends React.PureComponent {

  componentDidMount() {
    // send request to load this picture is liked or not
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

  render() {
    const { id, src, desc } = this.props

    if (!id || !src || !desc) {
      return null
    }

    const bigSrc = getRealSrcLink(src, 'large')
    return (
      <Mask>
        <Dialog>
          <picture>
            <source srcSet={bigSrc} />
            <img src={bigSrc} alt={desc} />
          </picture>
          <Extra>
            {/*<button>Like</button>*/}
            <button onClick={this.handleCollect}>Collect</button>
            <button onClick={(e) => {
              this.handleDelete(e)
            }}>Delete</button>
          </Extra>
        </Dialog>
      </Mask>
    )
  }
}

const Preview = (props) => {
  return ReactDOM.createPortal(<PreviewImage {...props.data} />, dom)
}

PreviewImage.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  desc: PropTypes.string,
  onClick: PropTypes.func,
  client: PropTypes.any
}

export default Preview
