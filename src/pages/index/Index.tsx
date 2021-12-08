import React from 'react'
import { useParams } from 'react-router'
import Photos from './Photos'

type IndexProps = {
  cid: number
}

function Index(props: IndexProps) {
  const params = useParams()
  return (
    <div className='w-full'>
      <Photos categoryID={~~(params.cid!)} />
    </div>
  )
}

export default Index
