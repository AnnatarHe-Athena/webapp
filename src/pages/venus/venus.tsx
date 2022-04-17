import { useMutation, useQuery } from '@apollo/client'
import venusListQuery from '../../schema/queries/venusList.graphql'
import addVenusListMutation from '../../schema/mutations/venusAdd.graphql'
import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { venusSource } from '../../schema/_g/globalTypes'
import { addVenusMutation, addVenusMutationVariables } from '../../schema/_g/addVenusMutation'
import { fetchVenusList, fetchVenusListVariables } from '../../schema/_g/fetchVenusList'

type VenusPageProps = {
}

function VenusPage(props: VenusPageProps) {
  const { data, refetch } = useQuery<fetchVenusList, fetchVenusListVariables>(venusListQuery, {
    variables: {
      hasRemarks: false,
      pagination: {
        limit: 20,
        lastID: 1 << 30
      }
    }
  })

  const [doAdd] = useMutation<addVenusMutation, addVenusMutationVariables>(addVenusListMutation)
  const [waitingVenusListText, setWaitingList] = useState('')
  const submitVenusToServer = useCallback(() => {
    const vs = waitingVenusListText.split('\n')
    if (vs.length === 0) {
      return
    }

    const uidReqList = vs
      .filter(x => x)
      .map(v => new URL(v).pathname)
      .map(x => {
        const xs = x.split('/')
        return xs[xs.length - 1]
      })
      .map(x => doAdd({
        variables: {
          uid: x,
          source: venusSource.weibo
        }
      }))

    Promise.allSettled(uidReqList).then(res => {
      toast.info('done')
      refetch()
      setWaitingList('')
    })
  }, [doAdd, waitingVenusListText, refetch])

  return (
    <div className='flex flex-col m-auto justify-center items-center pt-10 container'>
      <div className='flex flex-col w-full mb-4'>
        <textarea
          value={waitingVenusListText}
          onChange={v => setWaitingList(v.target.value)}
          className='w-full bg-gray-200 bg-opacity-20 rounded p-4 dark:text-gray-200 text-gray-800'
          rows={10}
        />
        <button
          className='py-4 w-full bg-blue-400 hover:bg-blue-500 mt-4 text-gray-800 rounded'
          disabled={waitingVenusListText.length === 0}
          onClick={submitVenusToServer}
        >
          submit venus to server
        </button>
      </div>
      <span className='dark:text-gray-200'>count: {data?.venusList.count}</span>
      <ul className='dark:text-gray-200'>
        {data?.venusList.edges.map(v => (
          <li key={v.id} className='my-2'>
            <p>{v.source} {v.name.length > 2 ? v.name : v.uid}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VenusPage
