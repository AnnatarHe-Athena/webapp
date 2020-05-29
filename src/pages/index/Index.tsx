import React from 'react'
import Photos from './Photos'

type IndexProps = {
  cid: number
}

function Index(props: IndexProps) {
  return (
    <div className='w-full'>
      <Photos categoryID={props.cid} />
    </div>
  )
}

// @graphql(helloQuery, {options: { notifyOnNetworkStatusChange: true }})

export default Index
