import * as React from 'react'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import { flexCompose } from '../../styles/variables'
import { ICategory } from '../../model/categories'
import { GET_CATEGORIES, CATEGORY_CHANGE_EPIC } from '../../constants/categories'

const Item = styled.li`
    list-style: none;
    padding: .5rem;
    color: teal;
    white-space: nowrap;
    ${flexCompose}

    &:hover {
        color: deeppink;
    }
    
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: no-wrap;
    overflow-x: scroll;
    background-color: #ff5722;
`

@(connect(state => ({
    categories: state.getIn(['girls', 'categories', 'items']),
    current: state.getIn(['app', 'cate'])
}), dispatch => ({
    fetchCategories() { return dispatch({ type: GET_CATEGORIES })},
    changeCategory(id) { return dispatch({ type: CATEGORY_CHANGE_EPIC, category: id })}
})) as any)
class Navigator extends React.PureComponent<any, any> {

    componentDidMount() {
        this.props.fetchCategories()
    }

    renderCategories() {
        if (this.props.categories.toJS().length === 0) {
            return null
        }

        return this.props.categories.toJS().map((cate: ICategory) => {
            return (
                <Item key={cate.id as number} onClick={() => {
                    this.props.changeCategory(cate.id)
                }}
                >{cate.name}</Item>
            )
        })
    }

    render() {
        return (
            <nav>
                <CSSTransitionGroup
                    transitionName="example"
                    component={List}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {this.renderCategories()}
                </CSSTransitionGroup>
            </nav>
        )
    }
}

export default Navigator