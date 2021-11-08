import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { Link, navigate } from '@reach/router'
import Dialog from '../dialog/Dialog'
import { changeCategory } from '../../actions/category'
import { randomCategory, legacyCategory } from '../../constants/defaults'
import { getPermissionObj, getToken } from '../../utils/permission'
import Nav from '../Nav'
import { AppStore } from '../../reducers'
import { TUser } from '../../types/user'
import { fetchCategories } from '../../types/fetchCategories'

const Bar = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    div:first-child {
        cursor: pointer;
    }

    a {
        color: #000;
        &:visited {
            color: #000;
        }

    }
`

const MenuItem = styled.div`
  &:last-child {
    margin-right: 0;
  }
`

function Header() {
  const info = useSelector<AppStore, TUser>(s => s.profile.info)
  const token = useSelector<AppStore, string>(s => s.app.token)
  const categories = useSelector<AppStore, fetchCategories[]>(s => s.app.categories)
  const canRemove = getPermissionObj(info).remove

  const onProfileClick = useCallback(() => {
    if (!token) {
      // auth
      navigate('/auth')
      return
    }

    navigate(`/profile/${info.id}`)
    return
  }, [token, info.id])

  const [vis, setVis] = useState(false)
  return (
    <header className='py-4 content-between flex-col items-center sticky top-0 bg-gray-50 bg-opacity-10 backdrop-blur-md z-30'>
      <Bar>
        <Link to="/"><h2 className="text-lg font-medium hover:text-xl transition-fast">Athena</h2></Link>
        <div className="flex flex-row">
          <MenuItem
            className="mr-8 py-2 px-4 bg-gray-300 hover:bg-gray-100 hover:shadow-lg transition-fast rounded"
            onClick={() => setVis(true)}
          >
            ✨ <span className="ml-2">Categories</span>
          </MenuItem>
          <MenuItem
            className="mr-8 py-2 px-4 bg-gray-300 hover:bg-gray-100 hover:shadow-lg transition-fast rounded"
            onClick={onProfileClick}
          >
            🙍‍ <span className="ml-2">User</span>
          </MenuItem>
        </div>
      </Bar>
      <Dialog visible={vis} onClose={() => setVis(false)}>
        <Nav categories={categories} onSelected={() => setVis(false)} />
      </Dialog>
    </header>
  )
}

export default Header
