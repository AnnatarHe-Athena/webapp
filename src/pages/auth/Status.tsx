import React from 'react'
import PropTypes from 'prop-types'

type StatusProps = {
  loading: boolean
}

function Status({ loading }: StatusProps) {
  return (
    <div className='flex flex-row align-center content-center'>
      <span className='text-black inline-block text-center w-full'>{loading ? '🤸‍ Signing in' : '🔑 Sign in'}</span>
    </div>
  )
}

export default Status
