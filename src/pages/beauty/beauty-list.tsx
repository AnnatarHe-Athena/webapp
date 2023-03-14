import React, { useCallback } from 'react'
import queryInitial from '../../schema/initial.graphql'
import { useQuery } from '@apollo/client'
import Nav from '../../components/Nav'
import { useSetAtom } from 'jotai'
import { beautyListFetchOffset } from '../../store/beauty'
import { useInitialQuery } from '../../schema/generated'

function BeautyList(props: any) {
  const { data, refetch } = useInitialQuery({
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
