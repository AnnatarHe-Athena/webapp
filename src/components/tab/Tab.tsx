import React, { useState } from 'react'

type TabProps = {
  tab: {
    title: string
    body: any
  }[]
}

function Tab(props: TabProps) {
  return (
    <div>
      <header className='flex'>
        {props.tab.map((x, i) => (
          <button className='focus:outline-none py-2 px-4 bg-red-200 hover:bg-red-400' key={i}>{x.title}</button>
        ))}
      </header>
      <div className='mt-2'>
        {props.tab[0].body}
      </div>
    </div>
  )
}

export default Tab
