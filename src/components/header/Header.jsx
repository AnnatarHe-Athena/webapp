import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, navigate } from '@reach/router'
import Dialog from '../dialog/Dialog'
import { changeCategory } from '../../actions/category'
import { randomCategory, legacyCategory } from '../../constants/defaults'
import { getPermissionObj, getToken } from '../../utils/permission'
import Nav from '../Nav'

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

@connect(store => ({
  canRemove: getPermissionObj(store.getIn(['profile', 'info']).toJS()).remove
}), dispatch => ({
  changeCategory(id) { return dispatch(changeCategory(id)) }
}))
class Header extends React.PureComponent {

  state = {
    navVisible: false
  }

  changeNavVisible = () => {
    this.setState({ navVisible: ! this.state.navVisible })
  }

  toAuthOrProfile = () => {
    const token = getToken()

    if (!token) {
      return navigate('/auth')
    }

    const userId = sessionStorage.getItem('athena-user-id')
    if (token && userId) {
      return navigate(`/profile/${userId}`)
    }
  }

  render() {
    const { categories, canRemove } = this.props
    const newCate = categories.concat(canRemove ? [randomCategory, legacyCategory] : randomCategory)
    return (
      <header className={`py-4 content-between flex-col items-center`}>
        <Bar>
          <Link to="/"><h2 className="text-lg font-medium hover:text-xl transition-fast">Athena</h2></Link>
          <div className="flex flex-row">
            <MenuItem className="mr-8 py-2 px-4 bg-gray-300 hover:bg-gray-100 hover:shadow-lg transition-fast rounded" onClick={this.changeNavVisible}>
               ✨ <span className="ml-2">Categories</span>
            </MenuItem>
            <MenuItem className="mr-8 py-2 px-4 bg-gray-300 hover:bg-gray-100 hover:shadow-lg transition-fast rounded" onClick={this.toAuthOrProfile}>
               🙍‍ <span className="ml-2">User</span>
            </MenuItem>
          </div>
        </Bar>
        <Dialog visible={this.state.navVisible} onClose={this.changeNavVisible}>
          <Nav categories={newCate} onSelected={this.changeNavVisible} />
        </Dialog>
      </header>
    )
  }
}

Header.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any)
}

export default Header
