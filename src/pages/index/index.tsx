import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Cards from '../../components/card/cards'
import Card from '../../components/card/card'
import { GET_GIRLS_CELL } from '../../constants/categories'

import Navigator from '../../components/header/navigator'

const Container = styled.div`
`

@(connect(state => ({
    cells: state.getIn(['girls', 'cells']),
    category: state.getIn(['app', 'cate'])
}), dispatch => ({
    fetchMore() { return dispatch({ type: GET_GIRLS_CELL })}
})) as any)
class Index extends React.PureComponent<any, any> {

    componentDidMount() {
        this.props.fetchMore()
    }

    renderCell() {
        return this.props.cells.get(this.props.category).toJS().map((cell: any) => {
            return (
                <Card name={cell.name} id={cell.id} key={cell.id} url={cell.url} />
            )
        })
    }

    render() {
        return (
            <Container>
                <Navigator />
                <Cards>
                </Cards>
            </Container>
        )
    }
}

export default Index
