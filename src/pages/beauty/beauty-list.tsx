import React, { useCallback } from 'react'
import { useQuery } from '@apollo/client'
import Nav from '../../components/Nav'
import { useSetAtom } from 'jotai'
import { beautyListFetchOffset } from '../../store/beauty'
import { InitialDocument, InitialQuery, InitialQueryVariables } from '../../schema/_g/graphql'

function BeautyList(props: any) {
  const { data, refetch } = useQuery<InitialQuery, InitialQueryVariables>(InitialDocument, {
    variables: {
      from: 0,
      take: 20,
      last: (1 << 30).toString()
    }
  })

  const setLastIdOffset = useSetAtom(beautyListFetchOffset)
  const onChangeCategory = useCallback(() => {
    refetch()
    setLastIdOffset(undefined)
  }, [setLastIdOffset, refetch])

  return (
    <div>
      <Nav
        categories={data?.categories.map(x => ({ id: x.id, name: x.name })) ?? []}
        onSelected={onChangeCategory}
      />
    </div>
  )
}

export default BeautyList
