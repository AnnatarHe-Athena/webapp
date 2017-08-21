import React from 'react'
import styled from 'styled-components'
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
    background: linear-gradient(to bottom right, blue, pink);
`

const Bar = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    `

@graphql(categoriesGQL)
class Header extends React.PureComponent {

    state = {
        navVisable: false
    }

    changeCategories = () => {

    }

    changeNavVisable = () => {
        this.setState({ navVisable: ! this.state.navVisable })
    }

    render() {
        return (
            <HeaderEl>
                <Bar>
                    <div onChange={this.changeCategories}><i className="fa fa-cube fa-lg" /><span>Categories</span></div>
                    <div><h2>Athena</h2></div>
                    <div><Link to="/login"><i className="fa fa-user-o fa-lg" /></Link></div>
                </Bar>
                <Nav categories={this.props.data.categories || []} onChange={this.changeCategories} />
            </HeaderEl>
        )
    }
}

export default Header