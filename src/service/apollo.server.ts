import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { cookies } from 'next/headers'

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'https://dbg-api.annatarhe.com'

export async function doApolloServerQuery<T>({ query, variables }: { query: any; variables?: any }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('athena:token')?.value || ''

  const client = new ApolloClient({
    link: new HttpLink({
      uri: `${API_HOST}/graphql/v1`,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'X-Platform': 'web',
      },
    }),
    cache: new InMemoryCache(),
    ssrMode: true,
  })

  return client.query<T>({ query, variables })
}
