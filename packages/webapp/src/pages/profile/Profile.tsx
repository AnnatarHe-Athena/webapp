import React from 'react'
import { useMyProfile } from './use-profile'
import Commands from './Commands'
import PhotoList from '@athena/components/photos/Photos'
import PageContainer from '@athena/components/PageContainer'
import Tab from '@athena/components/tab/Tab'
import Information from './Information'
import Separator from '@athena/components/Separator'
import { useParams } from 'react-router-dom'

function Profile() {
  const params = useParams()
  const { loadMore, collections } = useMyProfile(params.id!)

  return (
    <PageContainer>
      <div className="p-12 rounded-lg shadow-lg w-full backdrop-blur-3xl dark:bg-gray-800 dark:text-gray-200 bg-purple-700">
        <Information />
        <Separator />
        <Commands isMe={true} />
        <Separator />
        <Tab
          tab={[{
            title: 'collections',
            body: (
              <PhotoList
                loading={false}
                loadMore={loadMore}
                cells={collections.map(x => x.cell) as any}
                forceDeleteable={false}
              />
            )
          }]}
        />
      </div>
    </PageContainer>
  )
}

export default Profile
