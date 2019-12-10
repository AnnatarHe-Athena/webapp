import React from 'react'
import { useMyProfile } from './use-profile'
import Commands from './Commands'
import PhotoList from 'AthenaComponents/photos/Photos'
import PageContainer from 'AthenaComponents/PageContainer'
import Tab from 'AthenaComponents/tab/Tab'
import Information from './Information'
import Separator from 'AthenaComponents/Separator'

function Profile(props) {
  const { loadMore, collections } = useMyProfile(props.id)

  return (
    <PageContainer>
      <div className="p-12 mt-4 rounded-lg shadow-lg bg-white w-5/6">
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
              />
            )
          }]}
        />
      </div>
    </PageContainer>
  )
}

export default Profile
