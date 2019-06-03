import React, { useState, useEffect } from 'react'
import style from './style.css'
export const STORAGE_OFFSET_KEY = 'app:list:offset'

function NavOffsetInput() {
  const [offset, setOffset] = useState('')

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
            sessionStorage.setItem(STORAGE_OFFSET_KEY, val)
          }}
        />
      </div>
      <hr />
    </React.Fragment>
  )
}

export default NavOffsetInput
