import React from 'react'
import { TUser } from '../../../../utils/types/user'
import { useSelector } from 'react-redux'
import { AppStore } from '@athena/utils/reducers'
import { Link } from 'react-router-dom'

type TCommandProps = {
  isMe: boolean
}

function Command(props: TCommandProps) {
  const user = useSelector<AppStore, TUser>(s => s.profile.info)
  const canCreate = user.role > 90

  if (!props.isMe) {
    return null
  }

  return (
    <ul className='flex flex-rows'>
      <li>
        <Link
          to={'/profile/' + user.id + '/venus'}
          className='mb-8 bg-blue-400 hover:bg-blue-600 py-2 px-4 text-white rounded-lg mr-2'
        >Venus</Link>
      </li>
      {canCreate && (
        <li>
          <Link
            to={'/profile/' + user.id + '/create'}
            className='mb-8 bg-blue-400 hover:bg-blue-600 py-2 px-4 text-white rounded-lg'
          >Create</Link>
        </li>
      )}
    </ul>
  )
}

export default Command
