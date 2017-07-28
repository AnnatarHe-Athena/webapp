import React from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import {
  environment
} from '../../setup/relay'

class Index extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query hello {
            hello
          }
        `}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>
          }
          return <div>{JSON.stringify(props)}</div>
        }}
      />
    )
  }
}

export default Index

