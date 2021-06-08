import React from 'react'
import styled from 'styled-components'
// @ts-ignore
import Card from 'AthenaComponents/card/Card'
// @ts-ignore
import infoQuery from 'AthenaSchema/queries/info.graphql'
// import Spinner from 'react-spinkit'
import { useQuery } from '@apollo/react-hooks'
import { info } from '../../types/info'
// import { InfoData } from '../../types/info'

const InfoTip = styled.p`
  padding: 1rem;
  background-color: #222;
  color: #fff;
  border-radius: 4px;
`

console.log('hello info')

function InfoPage() {

  const { data, loading } = useQuery<info>(infoQuery)

  if (loading || !data) {
    return (
    <div className='flex items-center justify-center text-lg text-black'>
      {/* <Spinner name='circle' /> */}
    </div>
    )
  }

  const { userCount, cellCount, fee, email, copyright } = data.info
  return (
    <main className='w-full flex items-center justify-center flex-col'>
      <Card className='max-w-3xl' isFar>
        <InfoTip>已有 <strong>{cellCount}</strong> 张图片，和 <strong>{userCount}</strong> 名用户。</InfoTip>
        <InfoTip>暂无法注册，需要联系
             <a href={'mailto:' + email} className='text-red-400 py-1 hover:underline'>{copyright}</a> 申请，如果通过，需要付费可能是 <small>{fee}</small>
        </InfoTip>

        <hr />

        <h3>客户端下载：</h3>
        <InfoTip>敬请期待...</InfoTip>
      </Card>
    </main>
  )
}

// TODO: 加入客户端下载支持的功能
export default InfoPage

