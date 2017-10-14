import React from 'react'
import styled from 'styled-components'
import { CSSTransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { graphql, gql } from 'react-apollo'
import categoriesGQL from '../../../../schema/categories.graphql'
import { changeCategory } from '../../actions/category'
import Nav from '../Nav'

const defaultCategories = process.env.NODE_ENV === 'production' ? [] : [
    {id: 1, name: 'hello'},
    {id: 2, name: 'world'},
    {id: 3, name: 'alo'}
]

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

@connect(state => ({
}), dispatch => ({
    changeCategory(id) { return dispatch(changeCategory(id)) }
}))
class Header extends React.PureComponent {

    state = {
        navVisable: false
    }

    changeNavVisable = () => {
        this.setState({ navVisable: ! this.state.navVisable })
    }

    render() {
        const { categories } = this.props
        return (
            <HeaderEl>
                <Bar>
                    <div onClick={this.changeNavVisable}><i className="fa fa-cube fa-lg" /><span>Categories</span></div>
                    <div><h2>Athena</h2></div>
                    <div><Link to="/auth"><i className="fa fa-user-o fa-lg" /></Link></div>
                </Bar>
                <CSSTransitionGroup
                    component="div"
                    className=""
                    transitionName="menu"
                    transitionEnterTimeout={350}
                    transitionLeaveTimeout={350}
                >
                    {this.state.navVisable ? (
                        <Nav
                            categories={categories || defaultCategories}
                        />
                    ) : null}
                </CSSTransitionGroup>
            </HeaderEl>
        )
    }
}

export default Header
