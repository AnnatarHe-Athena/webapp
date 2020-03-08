import React from 'react'
import PropTypes from 'prop-types'
import Photos from './Photos'
import { report } from '../../utils/sentry'

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
      <div className='w-full'>
        <Photos categoryID={this.props.cid} />
      </div>
    )
  }
}

Index.propTypes = {
  params: PropTypes.any
}

export default Index
