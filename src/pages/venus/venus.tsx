import { useQuery } from '@apollo/client'
import venusListQuery from '../../schema/queries/venusList.graphql'
import React, { useState } from 'react'

type VenusPageProps = {
}

function VenusPage(props: VenusPageProps) {
  const { data } = useQuery(venusListQuery, {
    variables: {
    }
  })

  const [waitingVenusListText, setWaitingList] = useState('')

  return (
    <div>
      <div>
        <textarea value={waitingVenusListText} onChange={v => setWaitingList(v.target.value)} />
        <button className='p-4 ml-2 bg-blue-400 hover:bg-blue-500'>
          submit venus to server
        </button>
      </div>

      <ul>
        {data.map(v => (
          <li key={v.id}>
            <p>{v}</p>
          </li>
        ))}
      </ul>

    </div>

  )
}

export default VenusPage
