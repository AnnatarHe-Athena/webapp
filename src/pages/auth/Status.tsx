import React from 'react'
import PropTypes from 'prop-types'

type StatusProps = {
  loading: boolean
}

function Status({ loading }: StatusProps) {
  return (
    <div className='flex flex-row align-center content-center'>
      <i className={'fa fa-lg ' + (loading ? 'fa-spinner fa-pulse fa-fw' : 'fa-sign-in')} />
      <span className='text-white inline-block pl-4'>{loading ? 'Signing in' : 'Sign in'}</span>
    </div>
  )
}

export default Status
