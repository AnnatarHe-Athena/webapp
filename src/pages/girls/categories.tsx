import * as React from 'react'

class Categories extends React.PureComponent<any, any> {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default Categories