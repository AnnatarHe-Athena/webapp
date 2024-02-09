import React from 'react'
import { useParams } from 'react-router-dom'
import Photos from './Photos'

type IndexProps = {
  cid: number
}

function Index() {
  const params = useParams();
  return (
    <div className="w-full">
      <Photos categoryID={~~params.cid!} />
    </div>
  );
}

export default Index;
