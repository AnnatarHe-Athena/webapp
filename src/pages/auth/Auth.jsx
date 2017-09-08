import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import authMutationGraphql from '../../../../schema/mutations/auth.graphql'
import Button from '../../components/button/Button'
import Card from '../../components/card/Card'
import PageContainer from '../../components/PageContainer'
import Status from './Status'

const innerContainerOtherStyles = `
    h2 {
        margin: 0;
        color: #222;
    }

    hr {
        margin: 1rem 0 3rem 0;
        border: none;
        background-color: #d8d7d7;
        height: 1px;
        width: 100%;
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

@connect(null, dispatch => ({
    syncToken(token) { return dispatch }
}))
@graphql(authMutationGraphql, {
    props({ ownProps, mutate }) {
        return {
            auth({ email, password }) {
                return mutate({
                    variables: { email, password }
                }).then(result => {
                    return ownProps.syncToken(result.data)
                })
            }
        }
    } 
})
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

        this.props.auth({ email, password: pwd })
    }

    render() {
        return (
            <PageContainer>
                <Card isFar others={innerContainerOtherStyles}>
                    <h2>Auth</h2>
                    <hr />
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