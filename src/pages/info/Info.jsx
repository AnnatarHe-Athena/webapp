import React from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import infoQuery from 'AthenaSchema/queries/info.graphql'
import Card from 'AthenaComponents/card/Card'
import Spinner from 'react-spinkit'
import { red } from '../../styles/variables'

const Container = styled.main`
  width: 100%;
  a {
    color: ${red};
    padding: 0 .1rem;
    &:hover {
      text-decoration: underline;
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
`

const InfoTip = styled.p`
  padding: 1rem;
  background-color: #222;
  color: #fff;
  border-radius: 4px;
`

// TODO: 加入客户端下载支持的功能
@graphql(infoQuery)
class InfoPage extends React.PureComponent {

  componentDidCatch(err, info) {
    console.log(err, info)
  }

  render() {
    const { data, loading } = this.props
    if (loading || (!data) || (!data.info)) {
      return (
      <div className='flex items-center justify-center text-lg text-black'>
        <Spinner name='circle' />
      </div>
      )
    }

    const { userCount, cellCount, fee, email, copyright } = data.info
    return (
      <Container>
        <Card others={'max-width: 50rem;'}>
          <InfoTip>已有 <strong>{cellCount}</strong> 张图片，和 <strong>{userCount}</strong> 名用户。</InfoTip>
          <InfoTip>暂无法注册，需要联系 <a href={'mailto:' + email}>{copyright}</a> 申请，如果通过，需要付费可能是 <small>{fee}</small></InfoTip>

          <hr />

          <h3>客户端下载：</h3>
          <InfoTip>敬请期待...</InfoTip>
        </Card>
      </Container>
    )
  }
}

InfoPage.propTypes = {
  data: PropTypes.shape({
    info: PropTypes.object
  })
}

export default InfoPage

