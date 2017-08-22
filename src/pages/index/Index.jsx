import React from 'react'
import styled from 'styled-components'
import Photos from '../../components/photos/Photos'
// import helloQuery from '../../graphql/hello.graphql'
// import { graphql, gql } from 'react-apollo'

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
        <Photos />
      </Div>
    )
  }
}

export default Index
