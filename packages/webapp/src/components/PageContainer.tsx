import React from 'react'

type PageContainerProps = {
  children: React.ReactElement
}

function PageContainer(props: PageContainerProps) {
  return (
    <div className='flex items-center flex-col w-full min-h-[60vh]'>
      {props.children}
    </div>
  )
}

export default PageContainer
