import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import { syncAuthStatus } from '../../actions/auth'
import { red } from '../../styles/variables'
import authGraphql from 'AthenaSchema/queries/auth.graphql'
import Button from '../../components/button/Button'
import Card from '../../components/card/Card'
import { updateCategories } from '../../actions/category'
import initialQuery from 'AthenaSchema/categoriesQuery.graphql'
import PageContainer from '../../components/PageContainer'
import Separator from '../../components/Separator'
import Status from './Status'

const innerContainerOtherStyles = `
  h2 {
    margin: 0;
    color: #222;
    font-weight: 300;
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
    border-bottom: 1px solid #999;
    font-weight: 300;
  }
`

const Errors = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
  li {
    padding: .5rem 0 .5rem 1rem;
    border-radius: 4px;
    background-color: ${red};
    margin-bottom: .5rem;
    color: #fff;
  }
`

@connect(
  null, 
  dispatch => ({
    updateCategories(categories) { return dispatch(updateCategories(categories)) },
    syncToken(token, id) { return dispatch(syncAuthStatus(token, id)) }
  })
)
@withApollo
class Auth extends React.PureComponent {
    state = {
      email: '',
      pwd: '',
      errors: []
    }

    showError = (msgs) => {
      this.setState({
        errors: msgs
      })
      let timer = setTimeout(() => {
        this.setState({ errors: [] })
        clearTimeout(timer)
      }, 3000)
    }

    doAuth = () => {
      const { email, pwd } = this.state
      if (email.indexOf('@') === -1) {
        this.showError(['邮箱不正确'])
        return
      }
      if (pwd.length < 6) {
        this.showError(['密码不正确'])
        return
      }

      // this.props.auth({ email, password: pwd })
      this.props.client.query({
        query: authGraphql,
        variables: { email, password: pwd }
      }).then(result => {
        const { token, id } = result.data.auth
        this.props.syncToken(token, id)
        this.syncCategory()
      })
    }

    syncCategory() {
      return this.props.client.query({
        query: initialQuery
      }).then(result => {
        console.log(result)
        this.props.updateCategories(result.data.categories)
      })
    }

    render() {
      return (
        <PageContainer>
          <Card isFar others={innerContainerOtherStyles}>
            <h2>Auth</h2>
            <Separator />
            <Errors>
              {this.state.errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </Errors>
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
            <span>不支持用户注册，非盈利项目</span>
          </Card>
        </PageContainer>
      )
    }
}

Auth.propTypes = {
  client: PropTypes.any,
  syncToken: PropTypes.func,
  loading: PropTypes.bool
}

export default Auth
