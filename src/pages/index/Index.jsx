import React from 'react'
import styled from 'styled-components'
import Photos from './Photos'

const Div = styled.div`
  width: 100%;
`

// @graphql(helloQuery, {options: { notifyOnNetworkStatusChange: true }})
class Index extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Div>
        <Photos categoryID={this.props.params.cid || -1} />
      </Div>
    )
  }
}

export default Index
