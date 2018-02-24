import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-component'
import infoQuery from 'AthenaSchema/query/info.graphql'
import Card from 'AthenaComponents/card/Card'
import { graphql } from 'react-apollo'

const Container = styled.main`
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
  render() {
    const { userCount, cellCount, fee, email, copyright } = this.props.data
    return (
      <Container>
        <Card>
          <InfoTip>已有 <strong>{cellCount}</strong> 张图片，和 <strong>{userCount}</strong> 名用户。</InfoTip>
          <InfoTip>暂无法注册，需要联系 <a href={"mailto:" + email}>{copyright}</a>申请，如果通过，需要付费可能是 <small>{fee}</small></InfoTip>

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

