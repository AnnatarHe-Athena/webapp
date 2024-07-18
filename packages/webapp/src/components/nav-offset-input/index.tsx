import { useAtom } from 'jotai'
import React from 'react'
import { beautyListFetchOffset } from '../../store/beauty'

export const STORAGE_OFFSET_KEY = 'app:list:offset'

function NavOffsetInput() {
  const [offset, setOffset] = useAtom(beautyListFetchOffset)

  return (
    <React.Fragment>
      <div className='w-full flex justify-center items-center'>
        <label className='mr-1 text-white' htmlFor="">跳过</label>
        <input
          type="number"
          placeholder="the last id"
          className='flex-1 box-border px-1 py-2 text-lg'
          value={offset}
          onChange={e => {
            const val = ~~e.target.value
            setOffset(val)
          }}
        />
        <button
        className=' text-white ml-2 px-4 py-2 bg-blue-400 rounded hover:shadow-lg hover:bg-blue-500 transition-all duration-100'
          onClick={() => setOffset(undefined)}
        >
          clear
        </button>
      </div>
      <hr />
    </React.Fragment>
  )
}

export default NavOffsetInput
