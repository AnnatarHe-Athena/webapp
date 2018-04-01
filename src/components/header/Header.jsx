import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Dialog from '../dialog/Dialog'
import { changeCategory } from '../../actions/category'
import Nav from '../Nav'

const HeaderEl = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .5rem;
`

const Bar = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    div:first-child {
        cursor: pointer;
    }

    h2 {
      font-weight: 400;
      color: rgba(34, 34, 34, .6);
      transition: all .35s;
      &:hover {
        color: rgba(34, 34, 34, .9);
      }
    }

    a {
        color: #000;
        &:visited {
            color: #000;
        }

    }
`

const Menus = styled.div`
  display: flex;
  flex-direction: row;
`

const MenuItem = styled.div`
  margin-right: 1rem;
  padding: .5rem 1rem;
  background-color: rgba(255,255,255,.6);
  transition: all .35s;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    background-color: rgba(255,255,255,.8);
    box-shadow: 0 0 .5rem #222;
  }
  span {
    margin-left: .5rem;
  }
`

@connect(null, dispatch => ({
  changeCategory(id) { return dispatch(changeCategory(id)) }
}))
class Header extends React.PureComponent {

  state = {
    navVisible: false
  }

  changeNavVisible = () => {
    this.setState({ navVisible: ! this.state.navVisible })
  }

  render() {
    const { categories } = this.props
    return (
      <HeaderEl>
        <Bar>
          <Link to="/"><h2>Athena</h2></Link>
          <Menus>
            <MenuItem onClick={this.changeNavVisible}><i className="fa fa-align-justify fa-lg" /> <span>Categories</span></MenuItem>
            <MenuItem><Link to="/auth"><i className="fa fa-user fa-lg" /><span>User</span></Link></MenuItem>
          </Menus>
        </Bar>
        <Dialog visible={this.state.navVisible} onClose={this.changeNavVisible}>
          <Nav categories={categories} onSelected={this.changeNavVisible} />
        </Dialog>
      </HeaderEl>
    )
  }
}

Header.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any)
}

export default Header
