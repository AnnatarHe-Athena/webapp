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
    }

    a {
        color: #ffffff;
        &:visited {
            color: #ffffff;
        }
        &:hover {
            background-color: rgba(255, 255, 255, .8);
        }
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
          <div onClick={this.changeNavVisible}><i className="fa fa-cube fa-lg" /> <span>Categories</span></div>
          <div><h2>Athena</h2></div>
          <div><Link to="/auth"><i className="fa fa-user-o fa-lg" /></Link></div>
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
