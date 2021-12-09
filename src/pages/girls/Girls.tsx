import React, { useCallback } from 'react'
import Nav from 'AthenaComponents/Nav'
import queryInitial from '../../schema/initial.graphql'
import { useQuery } from '@apollo/client'
import { initial, initialVariables } from '../../types/initial'

function _Girls(props: any) {
  const { data, refetch, fetchMore } = useQuery<initial, initialVariables>(queryInitial, {
    variables: {
      from: 0,
      take: 20,
      last: (1 << 31).toString()
    }
  })

  const onChangeCategory = useCallback(() => {
    refetch()
  }, [])

  return (
    <div>
      <Nav categories={data?.categories || []} onSelected={onChangeCategory} />
    </div>
  )
}

export default _Girls
