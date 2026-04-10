'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLazyQuery } from '@apollo/client/react'
import { gql } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { setTokens } from '@/service/token'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import toast from 'react-hot-toast'

const AuthDocument = gql`
  query Auth($email: String!, $password: String!, $device: Device!) {
    auth(email: $email, password: $password, device: $device) {
      id
      token
      refreshToken
    }
  }
`

const loginSchema = z.object({
  email: z.string().email('Invalid email').min(6, 'Too short'),
  password: z.string().min(6, 'Too short').max(50, 'Too long'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const [doAuth] = useLazyQuery<any>(AuthDocument)

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { data } = await doAuth({
        variables: {
          email: values.email,
          password: values.password,
          device: {
            os: navigator.platform,
            version: navigator.platform,
            appVersion: 'web-3.0',
            id: 'web',
            lang: navigator.language,
          },
        },
      })

      if (data?.auth) {
        setTokens(data.auth.token, data.auth.refreshToken, data.auth.id)
        toast.success('Login successful')
        router.push(`/users/${data.auth.id}`)
      }
    } catch {
      toast.error('Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        type="password"
        placeholder="Password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" loading={isSubmitting} className="w-full">
        Login
      </Button>
    </form>
  )
}
