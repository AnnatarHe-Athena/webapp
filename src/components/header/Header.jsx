import React from 'react'
import styled from 'styled-components'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { graphql, gql } from 'react-apollo'
import categoriesGQL from '../../graphql/categories.graphql'
import Nav from '../Nav'

const HeaderEl = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const Bar = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

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

@graphql(categoriesGQL)
class Header extends React.PureComponent {

    state = {
        navVisable: false
    }

    changeCategories = () => {

    }

    changeNavVisable = () => {
        console.log('changeNavVisable')
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