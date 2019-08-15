import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { Link, navigate } from '@reach/router'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import { profileGot } from '../../actions/auth'
import { report, setUserInfo } from '../../utils/sentry'
import { getToken } from '../../utils/permission'
import Card from 'AthenaComponents/card/Card'
import fetchProfileQuery from 'AthenaSchema/queries/profileWithCollection.graphql'
import fetchCollectionQuery from 'AthenaSchema/queries/collections.graphql'

import PhotoList from 'AthenaComponents/photos/Photos'
import PageContainer from 'AthenaComponents/PageContainer'
import Tab from 'AthenaComponents/tab/Tab'
import Information from './Information'
import Separator from 'AthenaComponents/Separator'

const AddButton = styled.div`
  a {
    background-color: #03a9f4;
    padding: .25rem .5rem;
    border-radius: 4px;
    box-shadow: 0 0 .5rem #888;
    color: #fff;
    transition: all .35s;
    &:hover {
      padding: .5rem;
    }
  }
`

@connect(store => ({
  user: store.getIn(['profile', 'info'])
}), dispatch => ({
  syncUserInfo(info) { return dispatch(profileGot(info)) }
}))
@withApollo
class Profile extends React.PureComponent {

  constructor(props) {
    super(props)

    if (!getToken()) {
      navigate('/auth', { replace: true })
    }

    this.state = {
      collections: fromJS([])
    }
    this.variableFrom = 0
  }

  componentDidMount() {
    // 不能用自动加载的方式，需要整合 redux store
    if (this.props.user.get('id')) {
      return
    }
    this.setupProfile()
  }

  setupProfile() {
    this.props.client.query({
      query: fetchProfileQuery,
      variables: {
        id: this.props.id,
        from: this.variableFrom,
        size: 20
      }
    }).then(result => {
      // dispatch to user information
      // set to local collections
      const _collections = result.data.collections
      if (_collections && _collections.length !== 0) {
        this.setState({
          collections: this.state.collections.concat(result.data.collections)
        })
      }
      const user = result.data.users
      if (user && user.email) {
        setUserInfo(user)
        this.props.syncUserInfo(user)
      }
    }).catch(report)
    this.variableFrom += 20
  }

  loadMore = () => {
    this.props.client.query({
      query: fetchCollectionQuery,
      variables: {
        id: this.props.id,
        from: 0,
        size: 20
      }
    }).then(result => {
      const _collections = result.data.collections
      if (_collections && _collections.length !== 0) {
        this.setState({
          collections: this.state.collections.concat(result.data.collections)
        })
      }
    }).catch(report)
    // 可以重构一下，而且应该更新这个值在 async 内部
    this.variableFrom += 20
  }

  render() {
    const collectionBody = (
      <PhotoList
        loading={false}
        loadMore={this.loadMore}
        cells={this.state.collections.toJS()}
      />
    )
    return (
      <PageContainer>
        <div className="p-12 mt-4 rounded-lg shadow-lg bg-white">
          <Information
            user={this.props.user}
          />
          <Separator />
          <AddButton>
            <Link to={'/profile/' + this.props.id + '/create'}>Create</Link>
          </AddButton>
          <Separator />
          <Tab
            tab={[{
              title: 'collections',
              body: collectionBody
            }]}
          />
        </div>
      </PageContainer>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.any,
  client: PropTypes.any,
  syncUserInfo: PropTypes.func,
}

export default Profile
