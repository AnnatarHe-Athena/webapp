import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { cookies, headers } from 'next/headers'

export async function doApolloServerQuery<T>({ query, variables }: { query: any; variables?: any }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('athena:token')?.value || ''
  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:4399'
  const protocol = host.startsWith('localhost') ? 'http' : 'https'

  const client = new ApolloClient({
    link: new HttpLink({
      uri: `${protocol}://${host}/api/graphql`,
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
