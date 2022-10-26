import React, { useEffect, useRef } from 'react'
import Loading from '../Loading'
import PhotoItem from './PhotoItem'
import { fetchGirls } from '../../schema/_g/fetchGirls'

type PhotosProps = {
  cells: fetchGirls[]
  loading: boolean
  loadMore: () => void
  forceDeleteable: boolean
}

function Photos(props: PhotosProps) {
  const loadingRef = useRef(false)
  useEffect(() => {
    loadingRef.current = props.loading
  }, [props.loading])

  useEffect(() => {
    const root = document.querySelector('.athena-obs-more')
    if (!root) {
      return
    }
    const io = new IntersectionObserver(entries => {
      const e = entries[0]
      if (e.intersectionRatio <= 0 || loadingRef.current) {
        return
      }
      props.loadMore()
    })
    io.observe(root)
    return () => {
      io.unobserve(root)
      io.disconnect()
    }
  }, [props.loadMore])

  return (
    <main className='w-full'>
      <section className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 2xl:grid-cols-4">
        {props.cells.map(pic => {
          return (
            <PhotoItem
              key={pic.id}
              cell={pic}
              forceDeleteable={props.forceDeleteable}
            />
          )
        })}
      </section>
      <button
        disabled={props.loading}
        className="athena-obs-more py-4 px-8 bg-red-600 hover:bg-red-700 rounded transition-fast text-white shadow-lg"
        onClick={props.loadMore}
      > 🚥 Loading</button>
      {props.loading && (<Loading />)}
    </main>
  )
}


export default Photos
