import React, { useState } from 'react'

type TabProps = {
  tab: {
    title: string
    body: React.ReactElement
  }[]
}

function Tab(props: TabProps) {
  return (
    <div>
      <header className='flex'>
        {props.tab.map((x, i) => (
          <button
            className='focus:outline-none py-2 px-4 bg-red-600 hover:bg-red-700 rounded-sm'
            key={i}
          >
            {x.title}
          </button>
        ))}
      </header>
      <div className='mt-2'>
        {props.tab[0].body}
      </div>
    </div>
  )
}

export default Tab
