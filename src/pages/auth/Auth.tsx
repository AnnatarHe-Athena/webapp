import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect, useDispatch } from 'react-redux'
import { withApollo, useApolloClient, useLazyQuery } from 'react-apollo'
import { useFormik, ErrorMessage } from 'formik'
import PropTypes from 'prop-types'
import Yup from 'yup'
import fp from 'fingerprintjs2'
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
import Alert from '../../components/alert'
import { auth_auth, auth, authVariables } from '../../types/auth'
import { Device } from '../../types/globalTypes'
import { useTitle } from '../../hooks/title'

const styles = require('./auth.css')

const innerContainerOtherStyles = `
  h2 {
    margin: 0;
    color: #222;
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

function useDevice() {
  const [device, setDevice] = useState<Device | null>(null)

  useEffect(() => {
    setTimeout(function () {
      fp.get({
        excludes: {
          touchSupport: false,
        }
      }, function (components) {
        const audio = components.find(c => c.key === 'audio')
        setDevice({
          version: navigator.platform,
          os: navigator.platform,
          id: audio?.value || 'unknown',
          appVersion: 'none',
          lang: navigator.language
        })
      })
    }, 500)
  }, [])

  return device
}

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  pwd: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

function AuthPage() {
  const device = useDevice()
  const f = useFormik({
    initialValues: {
      email: '',
      pwd: '',
    },
    validationSchema: signupSchema,
    validateOnMount: false,
    onSubmit: async (value) => {
      await doAuth({
        variables: {
          email: f.values.email,
          password: f.values.pwd,
          device: device || ({} as Device)
        }
      })

      return
    }
  })

  useTitle('Auth')

  const [doAuth, { data }] = useLazyQuery<auth, authVariables>(authGraphql)

  return (
    <PageContainer>
      <div
        className='mt-24 p-4 rounded shadow w-1/2 lg:w-1/3 lg:mt-32'
        style={{
          backgroundColor: 'rgba(255,255,255, .7)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <h2 className='text-lg text-center'>🔑 Auth</h2>
        <Separator />
        <form onSubmit={f.handleSubmit}>
          <div className='w-full mb-2'>
            <input
              className='p-2 w-full focus:outline-none rounded-sm'
              value={f.values.email}
              name='email'
              type="email"
              onChange={f.handleChange}
              placeholder="Email"
            />
          </div>
          <ErrorMessage name='email' />
          <div className='w-full mb-2'>
            <input
              className='p-2 w-full focus:outline-none rounded-sm'
              value={f.values.pwd}
              type="password"
              name='pwd'
              onChange={f.handleChange}
              placeholder="Password"
            />
          </div>
          {/* <ErrorMessage name='pwd' /> */}
          <div>
            <button
              type='submit'
              disabled={f.isSubmitting}
              className={`w-full p-4 rounded shadow-lg focus:outline-none ${styles.submit}`}
            >
              <Status loading={f.isSubmitting} />
            </button>
          </div>
        </form>
        {/* <Alert text='不支持用户注册，非盈利项目' /> */}
      </div>
    </PageContainer>
  )
}

// @connect(
//   null,
//   dispatch => ({
//     updateCategories(categories) { return dispatch(updateCategories(categories)) },
//     syncToken(token, id) { return dispatch(syncAuthStatus(token, id)) }
//   })
// )
// @withApollo
// class Auth extends React.PureComponent {
//   state = {
//     email: '',
//     pwd: '',
//     errors: []
//   }

//   showError = (msgs) => {
//     this.setState({
//       errors: msgs
//     })
//     let timer = setTimeout(() => {
//       this.setState({ errors: [] })
//       clearTimeout(timer)
//     }, 3000)
//   }

//   doAuth = () => {
//     const { email, pwd } = this.state
//     if (email.indexOf('@') === -1) {
//       this.showError(['邮箱不正确'])
//       return
//     }
//     if (pwd.length < 6) {
//       this.showError(['密码不正确'])
//       return
//     }

//     // this.props.auth({ email, password: pwd })
//     this.props.client.query({
//       query: authGraphql,
//       variables: { email, password: pwd }
//     }).then(result => {
//       const { token, id } = result.data.auth
//       this.props.syncToken(token, id)
//       this.syncCategory()
//     })
//   }

//   syncCategory() {
//     return this.props.client.query({
//       query: initialQuery
//     }).then(result => {
//       console.log(result)
//       this.props.updateCategories(result.data.categories)
//     })
//   }

//   render() {
//     return (
//       <PageContainer>
//         <Card isFar others={innerContainerOtherStyles}>
//           <h2 className='text-lg'>🔑 Auth</h2>
//           <Separator />
//           <Errors>
//             {this.state.errors.map((e, i) => (
//               <li key={i}>{e}</li>
//             ))}
//           </Errors>
//           <Field>
//             <input
//               value={this.state.email}
//               type="email"
//               onChange={e => { this.setState({ email: e.target.value }) }}
//               placeholder="Email"
//             />
//           </Field>
//           <Field>
//             <input
//               value={this.state.pwd}
//               type="password"
//               onChange={e => { this.setState({ pwd: e.target.value }) }}
//               placeholder="Password"
//             />
//           </Field>
//           <Field>
//             <button
//               type='submit'
//               disabled={this.props.loading}
//               onClick={this.doAuth}
//               className={`w-full p-4 rounded shadow-lg ${styles.submit}`}
//             >
//               <Status loading={this.props.loading} />
//             </button>
//           </Field>
//           <Alert text='不支持用户注册，非盈利项目' />
//         </Card>
//       </PageContainer>
//     )
//   }
// }

// Auth.propTypes = {
//   client: PropTypes.any,
//   syncToken: PropTypes.func,
//   loading: PropTypes.bool
// }

export default AuthPage
