import React from 'react'
import styled from 'styled-components'
import helloQuery from '../../graphql/hello.graphql'
import { graphql, gql } from 'react-apollo'

const Div = styled.div`
  width: 100%;
  background-color: red;
`

@graphql(helloQuery, {options: { notifyOnNetworkStatusChange: true }})
class Index extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Div>hello</Div>
    )
  }
}

export default Index
