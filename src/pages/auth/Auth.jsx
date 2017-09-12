import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { graphql, withApollo } from 'react-apollo'
import { syncAuthStatus } from '../../actions/auth'
import authGraphql from '../../../../schema/queries/auth.graphql'
import Button from '../../components/button/Button'
import Card from '../../components/card/Card'
import PageContainer from '../../components/PageContainer'
import Separator from '../../components/Separator'
import Status from './Status'

const innerContainerOtherStyles = `
    h2 {
        margin: 0;
        color: #222;
    }

    span {
        font-size: 12px;
        font-style: italic;
        color: #888;
    }
`

const Field = styled.div`
    margin: 1rem 0;
    input {
        outline: none;
        border: none;
        height: 1.5rem;
        width: 20rem;
        padding: .2rem;
        border-bottom: 1px solid #888;
    }
`

import { push } from 'react-router-redux'

@connect(null, dispatch => ({
    syncToken(token, id) { return dispatch(syncAuthStatus(token, id)) }
}))
@withApollo
class Auth extends React.PureComponent {
    state = {
        email: '',
        pwd: ''
    }

    doAuth = e => {
        const { email, pwd } = this.state
        if (email.indexOf('@') === -1) {
            return
        }
        if (pwd.length < 6) {
            return
        }

        // this.props.auth({ email, password: pwd })
        this.props.client.query({
          query: authGraphql,
          variables: { email, password:pwd }
        }).then(result => {
          const { token, id } = result.data.auth
          this.props.syncToken(token, id)
        })
    }

    render() {
        return (
            <PageContainer>
                <Card isFar others={innerContainerOtherStyles}>
                    <h2>Auth</h2>
                    <Separator />
                    <Field>
                        <input
                            value={this.state.email}
                            type="email"
                            onChange={e => { this.setState({ email: e.target.value})}}
                            placeholder="Email"
                        />
                    </Field>
                    <Field>
                        <input
                            value={this.state.pwd}
                            type="password"
                            onChange={e => { this.setState({ pwd: e.target.value})}} 
                            placeholder="Password"
                        />
                    </Field>
                    <Field>
                        <Button
                            disabled={this.props.loading}
                            type="submit"
                            color="blue"
                            size="medium"
                            onClick={this.doAuth}
                            fill
                        >
                            <Status loading={this.props.loading} />
                        </Button>
                    </Field>
                    <span>NO registry method</span>
                </Card>
            </PageContainer>
        )
    }
}

export default Auth
