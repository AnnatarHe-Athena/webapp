import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { defaultAvatar } from '@athena/utils/constants/defaults'
import { LOGOUT } from '@athena/utils/constants/auth'
import { TUser } from '../../../../utils/types/user';
import { AppStore } from '@athena/utils/reducers'
import HideUntilLoaded from '@athena/components/HideUntilLoaded'

const InfoItem = styled.div`
  padding: .5rem 0;
  span:first-child {
    color: #888;
  }
`

type TSchemaCanShow = {
  column: keyof TUser
  name: string
}

const schemaCanShow: TSchemaCanShow[] = [{
  column: 'email',
  name: 'Email'
}, {
  column: 'name',
  name: 'Name'
}, {
  column: 'bio',
  name: 'Bio'
}]

function Information() {
  const user = useSelector<AppStore, TUser>(s => s.profile.info)
  const dispatch = useDispatch()
  const onLogout = useCallback(() => {
    dispatch({ type: LOGOUT })
  }, [])

  const _avatar = user.avatar
  const avatarUrl = (_avatar && _avatar !== 'null') ? _avatar : defaultAvatar

  if (!user.id) {
    return null
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='mr-4'>
        <HideUntilLoaded imageToLoad={avatarUrl}>
          <img src={avatarUrl} className='rounded w-16 h-16' />
        </HideUntilLoaded>
      </div>
      <div>
        {schemaCanShow.map((x, i) => (
          <InfoItem key={i}>
            <span>{x.name}: </span>
            <span>{user[x.column]}</span>
          </InfoItem>
        )).concat((
          <InfoItem key={schemaCanShow.length + 1}>
            <button className="py-2 px-4 bg-red-400 rounded hover:bg-red-500 transition-fast text-white" onClick={onLogout}>
              🤦‍ logout
            </button>
          </InfoItem>
        ))}
      </div>
    </div>
  )
}

export default Information
