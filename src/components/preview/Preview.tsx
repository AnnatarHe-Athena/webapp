import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import CommonDialog from '../dialog/Dialog'
import { getRealSrcLink, getUserInfoURL, getTitleHref } from '../../utils/index'
import { getPermissionObj } from '../../utils/permission'
import { HideUntilLoaded } from 'react-animation'
const addCollectionMutation = require('AthenaSchema/mutations/addCollection.graphql')
const removeGirlCellMutation = require('AthenaSchema/mutations/removeGirlCell.graphql')
import { useApolloClient } from '@apollo/react-hooks'
import { AppStore } from '../../reducers'
import { TUser } from '../../types/user'

type PreviewImageProps = {
  id: string
  src: string
  desc: string
  client: any
  fromID: string
  fromURL: string
  content: string
  onClose: () => void
}

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

function PreviewImage(props: PreviewImageProps) {
  const { id, src, desc, fromID, fromURL, content, onClose } = props
  const user = useSelector<AppStore, TUser>(s => s.profile.info)

  const { softRemove } = getPermissionObj(user)

  const leftUserInfo = fromID ? (
    <div>
      <a
        className='text-white text-center font-light' href={getUserInfoURL(fromID, fromURL)}
        target="_blank">
        🧙‍♀️ 我的信息
      </a>
    </div>
  ) : null

  const middleTitle = (
    <div className='w-7/12'>
      <a href={getTitleHref(fromURL)} target="_blank">
        <h2 className='text-center font-light text-white'>{desc || '主题'}</h2>
      </a>
    </div>
  )

  const bigSrc = getRealSrcLink(src, 'large')
  const client = useApolloClient()

  const handleCollect = useCallback(() => {
    client.mutate({
      mutation: addCollectionMutation,
      variables: {
        cells: [~~id]
      }
    })

  }, [id])
  const handleDelete = useCallback(() => {
    client.mutate({
      mutation: removeGirlCellMutation,
      variables: {
        cells: [~~id],
        toRemove: false
      }
    })
  }, [id])
  return (
    <div>
      <Extra className='fixed flex top-0 left-0 right-0 items-center justify-around p-4 box-border z-10'>
        {leftUserInfo}
        {middleTitle}
        <div>
          <ExtraButton onClick={handleCollect}>Collect</ExtraButton>
          {softRemove && <ExtraButton onClick={handleDelete}>Delete</ExtraButton>}
        </div>
      </Extra>
      <Figure>
        <HideUntilLoaded imageToLoad={bigSrc}>
          <picture onClick={onClose}>
            <source srcSet={bigSrc} />
            <img src={bigSrc} alt={desc} />
            <figcaption>{content}</figcaption>
          </picture>
        </HideUntilLoaded>
      </Figure>
    </div>
  )
}

function Preview({ data, visible, onClose }: any) {
  return (
    <CommonDialog visible={visible} onClose={onClose}>
      <PreviewImage {...data} onClose={onClose} />
    </CommonDialog>
  )
}

export default Preview
