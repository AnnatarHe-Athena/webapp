import React, { useState } from 'react'
import { connect, useSelector } from 'react-redux'
import Dialog from '../dialog/Dialog'
import { getPermissionObj, getToken } from '../../utils/permission'
import Nav from '../Nav'
import { AppStore } from '../../reducers'
import { TUser } from '../../types/user'
import { Link, useNavigate } from 'react-router-dom'
import { fetchCategories } from '../../schema/_g/fetchCategories'

function Header() {
  const info = useSelector<AppStore, TUser>(s => s.profile.info)
  const token = useSelector<AppStore, string>(s => s.app.token)
  const categories = useSelector<AppStore, fetchCategories[]>(s => s.app.categories)
  const canRemove = getPermissionObj(info).remove

  const [vis, setVis] = useState(false)

  return (
    <header className='py-4 content-between flex-col items-center sticky top-0 bg-gray-50 bg-opacity-10 backdrop-blur-md z-30'>
      <div className=' w-full flex flex-row items-center justify-around'>
        <Link to="/">
          <h2 className="text-lg font-medium dark:text-gray-200 hover:scale-105 transition-fast">
            Athena
            </h2>
          </Link>
        <div className="flex flex-row">
          <div
            className="mr-8 py-2 px-4 bg-gray-300 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 rounded dark:bg-gray-700 hover:dark:bg-gray-600 dark:text-gray-200 cursor-pointer"
            onClick={() => setVis(true)}
          >
            ✨ <span className="ml-2">Categories</span>
          </div>
          <Link
            className="mr-8 py-2 px-4 bg-gray-300 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 rounded dark:bg-gray-700 hover:dark:bg-gray-600 dark:text-gray-200 cursor-pointer"
            to={token ? `/profile/${info.id}` : '/auth'}
          >
            🙍‍ <span className="ml-2">{info.name ? info.name : 'Login'}</span>
          </Link>
        </div>
      </div>
      <Dialog visible={vis} onClose={() => setVis(false)}>
        <Nav categories={categories} onSelected={() => setVis(false)} />
      </Dialog>
    </header>
  )
}

export default Header
