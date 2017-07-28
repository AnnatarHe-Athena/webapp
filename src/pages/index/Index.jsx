import React from 'react'
import styled from 'styled-components'
import { graphql, gql } from 'react-apollo'

const Div = styled.div`
  width: 100%;
  background-color: red;
`

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

export default graphql(gql`{
  hello
}`, {
  options: { notifyOnNetworkStatusChange: true }
})(Index)

