import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Photos from './Photos'
import { report } from '../../utils/sentry'

const Div = styled.div`
  width: 100%;
`

// @graphql(helloQuery, {options: { notifyOnNetworkStatusChange: true }})
class Index extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidCatch(err, info) {
    report(err, info)
  }

  render() {
    return (
      <Div>
        <Photos categoryID={this.props.cid} />
      </Div>
    )
  }
}

Index.propTypes = {
  params: PropTypes.any
}

export default Index
