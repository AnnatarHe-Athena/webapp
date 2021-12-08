import React, { useState, useEffect } from 'react'

export const STORAGE_OFFSET_KEY = 'app:list:offset'

function NavOffsetInput() {
  const [offset, setOffset] = useState(-1)

  useEffect(() => {
    const val = sessionStorage.getItem(STORAGE_OFFSET_KEY)
    if (!val) {
      return
    }

    setOffset(~~val)
  }, [])

  return (
    <React.Fragment>
      <div className='w-full flex justify-center items-center'>
        <label className='mr-1 text-white' htmlFor="">跳过</label>
        <input
          type="number"
          placeholder="offset"
          className='flex-1 box-border px-1 py-2 text-lg'
          value={offset}
          onChange={e => {
            const val = ~~e.target.value
            setOffset(val)
            sessionStorage.setItem(STORAGE_OFFSET_KEY, val.toString())
          }}
        />
      </div>
      <hr />
    </React.Fragment>
  )
}

export default NavOffsetInput
