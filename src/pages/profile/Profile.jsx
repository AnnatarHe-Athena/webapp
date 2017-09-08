import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { graphql, withApollo } from 'react-apollo'
import { profileGot } from '../../actions/auth'
import Card from '../../components/card/Card'
import fetchProfileQuery from '../../../../schema/queries/fetchProfile.graphql'

import PageContainer from '../../components/PageContainer'

@connect(store => ({
    user: store.getIn(['profile', 'info'])
}), dispatch => ({
    syncUserInfo(info) { return dispatch(profileGot(info)) }
}))
@withApollo
class Profile extends React.PureComponent {
    constructor(props) {
        super(props)
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
                id: this.props.params.id
            }
        }).then(result => {
            this.props.syncUserInfo(result)
            console.log(result)
        }).catch(err => {
            console.error(err)
        })
    }

    render() {
        return (
            <PageContainer>
                <Card isFar>
                    <span>hello</span>
                </Card>
            </PageContainer>
        )
    }
}

export default Profile