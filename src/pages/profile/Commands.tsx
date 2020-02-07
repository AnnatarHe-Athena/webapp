import React from 'react'
import { Link } from '@reach/router'
import { TUser } from '../../types/user';
import { useSelector } from 'react-redux';
import { AppStore } from '../../reducers';

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
