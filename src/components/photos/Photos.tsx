import React, { useEffect, useRef } from "react";
import { FetchGirlsFragment } from "src/schema/_g/graphql";
import Loading from "../Loading";
import PhotoItem from "./PhotoItem";

type PhotosProps = {
  cells: FetchGirlsFragment[]
  loading: boolean
  loadMore: () => void
  forceDeleteable: boolean
}

function Photos(props: PhotosProps) {
  const loadingRef = useRef(false);
  useEffect(() => {
    loadingRef.current = props.loading;
  }, [props.loading]);

  useEffect(() => {
    const root = document.querySelector(".athena-obs-more");
    if (!root) {
      return;
    }
    const io = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (e.intersectionRatio <= 0 || loadingRef.current) {
        return;
      }
      props.loadMore();
    });
    io.observe(root);
    return () => {
      io.unobserve(root);
      io.disconnect();
    };
  }, [props.loadMore]);

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
      <div className='w-full text-center'>
        <button
          disabled={props.loading}
          className="athena-obs-more transition-fast rounded bg-red-600 px-8 py-4 text-white shadow-lg hover:bg-red-700"
          onClick={props.loadMore}
        >
          🚥
          Loading
        </button>
      </div>
    </main>
  );
}

export default Photos;
