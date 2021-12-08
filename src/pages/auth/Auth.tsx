import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLazyQuery } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import fp from 'fingerprintjs2'
import { syncAuthStatus } from '../../actions/auth'
import authGraphql from 'AthenaSchema/queries/auth.graphql'
import PageContainer from '../../components/PageContainer'
import Separator from '../../components/Separator'
import Status from './Status'
import { auth, authVariables } from '../../types/auth'
import { Device } from '../../types/globalTypes'
import { useTitle } from '../../hooks/title'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

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
  const navigate = useNavigate()
  const f = useFormik({
    initialValues: {
      email: '',
      pwd: '',
    },
    validationSchema: signupSchema,
    validateOnMount: false,
    onSubmit: async (values) => {
      if (values.email === '' || values.pwd === '' || Object.keys(f.errors).length > 0) {
        toast.error('data required')
        return
      }

      await doAuth({
        variables: {
          email: values.email,
          password: values.pwd,
          device: device || ({} as Device)
        }
      }).then(res => {
        setTimeout(() => {
          navigate(`/profile/${res.data?.auth.id}`)
        }, 100)
      })

      return true
    }
  })

  useTitle('Auth')

  const [doAuth, { data }] = useLazyQuery<auth, authVariables>(authGraphql)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!data) {
      return
    }
    const { token, id } = data.auth
    dispatch(syncAuthStatus(token, id))
  }, [data])

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
            {
              f.errors.email && (
                <span className='bg-red-400 w-full block p-2 with-fade-in'>{f.errors.email}</span>
              )
            }
          </div>
          <div className='w-full mb-2'>
            <input
              className='p-2 w-full focus:outline-none rounded-sm'
              value={f.values.pwd}
              type="password"
              name='pwd'
              onChange={f.handleChange}
              placeholder="Password"
            />
            {
              f.errors.pwd && (
                <span className='bg-red-400 w-full block p-2 with-fade-in'>{f.errors.pwd}</span>
              )
            }
          </div>
          <div>
            <button
              type='submit'
              disabled={f.isSubmitting}
              className='w-full p-4 rounded shadow-lg focus:outline-none bg-gradient-to-tr from-green-400 to-blue-500'
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


export default AuthPage
