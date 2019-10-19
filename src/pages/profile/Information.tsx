import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { defaultAvatar } from '../../constants/defaults'
import { LOGOUT } from '../../constants/auth'
import { TUser } from '../../types/user';
import { useUser } from './use-profile';

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
  const user = useUser()
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
    <div className='flex'>
      <div className='mr-4'>
        <img src={avatarUrl} className='rounded w-10 h-10' />
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
