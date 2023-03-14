import { useApolloClient, useMutation } from '@apollo/client'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import addCollectionMutation from '../../schema/mutations/addCollection.graphql'
import removeGirlCellMutation from '../../schema/mutations/removeGirlCell.graphql'
import { useImageDestLink } from '../../hooks/useImageDestLink'
import { AppStore } from '../../reducers'
import { TUser } from '../../types/user'
import { getUserInfoURL, getTitleHref, getRealSrcLink } from '../../utils'
import { getPermissionObj } from '../../utils/permission'
import HideUntilLoaded from '../HideUntilLoaded'
import { FetchGirlsFragment, useAddToCollectionMutation, useRemoveGirlMutation } from '../../schema/generated'

type PreviewImageProps = {
  cell: FetchGirlsFragment
  onClose: () => void
}

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
  const { id, img, text, fromID, fromURL, content } = props.cell
  const onClose = props.onClose
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
        <h2 className='text-center font-light text-white'>{text || '主题'}</h2>
      </a>
    </div>
  )

  const basedLink = useImageDestLink(img)
  const bigSrc = getRealSrcLink(atob(basedLink))
  // const bigSrc = getRealSrcLink(src, 'large')
  const client = useApolloClient()

  const [handleCollect] = useAddToCollectionMutation({
    variables: {
      cells: [id.toString()]
    },
    onCompleted() {
      toast.success('已收藏')
    }
  })
  const [handleDelete] = useRemoveGirlMutation({
    variables: {
      cells: [id.toString()],
      toRemove: false
    },
    onCompleted() {
      toast.success('已删除')
      props.onClose()
    }
  })
  return (
    <div>
      <Extra className='fixed flex top-0 left-0 right-0 items-center justify-around p-4 box-border z-10'>
        {leftUserInfo}
        {middleTitle}
        <div>
          <ExtraButton onClick={props.onClose}>Close</ExtraButton>
          <ExtraButton onClick={() => handleCollect({ variables: { cells: [id.toString()] } })}>Collect</ExtraButton>
          {softRemove && <ExtraButton
            onClick={() => handleDelete({
              variables: {
                cells: [id.toString()],
                toRemove: false
              }
            })}
          >
            Delete
          </ExtraButton>}
        </div>
      </Extra>
      <HideUntilLoaded imageToLoad={bigSrc}>
        <div
          className='rounded p-10 shadow-lg flex bg-gray-600 bg-opacity-30 m-10 overflow-auto'
          style={{
            maxHeight: '95vh'
          }}
        >
          <figure className='bg-gray-900 bg-opacity-10 max-h-screen overflow-auto'>
            <picture onClick={onClose}>
              <source srcSet={bigSrc} />
              <img
                src={bigSrc}
                alt={text}
                className='w-full rounded'
              />
            </picture>
          </figure>
          <div className='w-52 flex items-end justify-between flex-col'>
            <p className=' text-right text-xs p-1 dark:text-gray-200'>{content}</p>
            {props.cell.venus ? (
              <div className=' dark:text-gray-200 text-gray-800 text-right text-sm'>
                {/* TODO: show avatar */}
                <p>#{props.cell.venus?.uid}</p>
                <h2>{props.cell.venus?.name}</h2>
                <h2>{props.cell.venus?.bio}</h2>
                <p>{props.cell.venus?.remarks}</p>
              </div>
            ) : null}
          </div>
        </div>
      </HideUntilLoaded>
    </div>
  )
}

export default PreviewImage
