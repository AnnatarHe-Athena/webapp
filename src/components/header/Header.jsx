import React from 'react'
import styled from 'styled-components'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { graphql, gql } from 'react-apollo'
import categoriesGQL from '../../graphql/categories.graphql'
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

// 第二版需要修改 UI， 需要改成路由获取categoryID
@graphql(categoriesGQL)
@connect(state => ({
    categoryID: state.getIn(['app', 'categoryID'])
}), dispatch => ({
    changeCategory(id) { return dispatch(changeCategory(id)) }
}))
class Header extends React.PureComponent {

    state = {
        navVisable: false
    }

    changeCategories = (id) => {
        this.props.changeCategory(id)
    }

    changeNavVisable = () => {
        this.setState({ navVisable: ! this.state.navVisable })
    }

    render() {
        return (
            <HeaderEl>
                <Bar>
                    <div onClick={this.changeNavVisable}><i className="fa fa-cube fa-lg" /><span>Categories</span></div>
                    <div><h2>Athena</h2></div>
                    <div><Link to="/login"><i className="fa fa-user-o fa-lg" /></Link></div>
                </Bar>
                <CSSTransitionGroup
                    component="div"
                    className=""
                    transitionName="menu"
                    transitionEnterTimeout={350}
                    transitionLeaveTimeout={350}
                >
                    {this.state.navVisable ? (
                        <Nav categories={this.props.data.categories || []} onChange={this.changeCategories} />
                    ) : null}
                </CSSTransitionGroup>
            </HeaderEl>
        )
    }
}

export default Header