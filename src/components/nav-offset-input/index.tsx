import React, { useState, useEffect } from 'react'
const style = require('./style.css').default

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
      <div className={style.field}>
        <label className={style.label} htmlFor="">跳过</label>
        <input
          type="number"
          placeholder="offset"
          className={style.input}
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
