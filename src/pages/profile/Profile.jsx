import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { graphql, withApollo } from 'react-apollo'
import { profileGot } from '../../actions/auth'
import Card from '../../components/card/Card'
import fetchProfileQuery from '../../../../schema/queries/profileWithCollection.graphql'

import PhotoList from '../../components/photos/Photos'
import PageContainer from '../../components/PageContainer'
import Tab from '../../components/tab/Tab'
import Information from './Information'
import Separator from '../../components/Separator'

@connect(store => ({
    user: store.getIn(['profile', 'info'])
}), dispatch => ({
    syncUserInfo(info) { return dispatch(profileGot(info)) }
}))
@withApollo
class Profile extends React.PureComponent {

    state = {
        collections: fromJS([])
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
                id: this.props.params.id,
                from: 0,
                size: 20
            }
        }).then(result => {
            // dispatch to user information
            // set to local collections
            console.log(result)
            this.props.syncUserInfo(result)
        }).catch(err => {
            console.error(err)
        })
    }

    render() {
      const collectionBody = (
        <div>
          <PhotoList
            loading={this.props.loading}
            loadMore={this.props.loadMore}
            cells={this.state.collections}
          />
        </div>
        )
      return (
        <PageContainer>
          <Card isFar>
              <Information
                  user={this.props.user}
              />
              <Separator />
              <Tab
                  tab={[{
                      title: 'title',
                      body: collectionBody
                  }]}
              />
          </Card>
        </PageContainer>
      )
    }
}

export default Profile
