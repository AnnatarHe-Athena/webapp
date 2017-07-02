import * as React from 'react'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { GET_GIRLS_CELL } from '../../constants/categories'

const mapStateToProps = (state: Map<any, any>) => ({
    grils: state.getIn(['girls'])
})

const mapDispatchToProps = (dispatch: any) => ({
    load(category: string) { return dispatch({ type: GET_GIRLS_CELL, category })}
})

interface IWithDispatch<P> extends RouteComponentProps<P> {
    load: Function
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class Cells extends React.PureComponent<IWithDispatch<any>, any> {
    state = {
        loading: false
    }
    componentDidMount() {
        this.loadMore()
    }
    loadMore() {
        if (this.state.loading) {
            return
        }
        const category = this.props.match.params.category
        const ret = this.props.load(category)
        console.log(ret)
    }
    render() {
        return (
            <div>
                cells
            </div>
        )
    }
}

export default Cells