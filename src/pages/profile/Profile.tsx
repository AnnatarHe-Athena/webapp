import React from 'react'
import { useMyProfile } from './use-profile'
import Commands from './Commands'
import PhotoList from '../../components/photos/Photos'
import PageContainer from '../../components/PageContainer'
import Tab from '../../components/tab/Tab'
import Information from './Information'
import Separator from '../../components/Separator'
import { useParams } from 'react-router'

function Profile() {
  const params = useParams()
  const { loadMore, collections } = useMyProfile(params.id!)

  return (
    <PageContainer>
      <div className="p-12 mt-4 rounded-lg shadow-lg bg-white w-5/6 my-20">
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
                cells={collections}
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
