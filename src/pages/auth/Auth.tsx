import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLazyQuery } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import fp from 'fingerprintjs2'
import { syncAuthStatus } from '../../actions/auth'
import authGraphql from '../../schema/queries/auth.graphql'
import PageContainer from '../../components/PageContainer'
import Separator from '../../components/Separator'
import Status from './Status'
import { useTitle } from '../../hooks/title'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Device, useAuthLazyQuery } from '../../schema/generated'

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

      return doAuth({
        variables: {
          email: values.email,
          password: values.pwd,
          device: device || ({} as Device)
        }
      }).then(res => {
        if (!res.data?.auth.id){
          toast.error('no auth info')
          return
        }
        setTimeout(() => {
          navigate(`/profile/${res.data?.auth.id}`)
        }, 100)
      })
    }
  })

  useTitle('Auth')

  const [doAuth, { data }] = useAuthLazyQuery()
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
        className='mt-24 p-4 rounded shadow w-1/2 lg:w-1/3 lg:mt-32 bg-blue-400 bg-opacity-25 backdrop-blur-3xl'
      >
        <h2 className='text-lg text-center dark:text-white'>🔑 Auth</h2>
        <Separator />
        <form onSubmit={f.handleSubmit}>
          <div className='w-full mb-2'>
            <input
              className='p-2 w-full focus:outline-none rounded-sm bg-gray-200 bg-opacity-20'
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
              className='p-2 w-full focus:outline-none rounded-sm bg-gray-200 bg-opacity-20'
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
              disabled={f.isSubmitting || !f.isValid}
              className='w-full p-4 rounded shadow-lg focus:outline-none bg-gradient-to-tr from-gray-400 to-blue-400 disabled:from-gray-300 disabled:to-gray-300'
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
