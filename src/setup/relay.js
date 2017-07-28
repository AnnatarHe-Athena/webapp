import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime'

function getPrefix() {
  return process.env.NODE_ENV === 'production' ? 'https://api.dbg.annatarhe.com' : 'http://localhost:9000'
}

function fetchQuery(
  operation,
  variables,
  cacheConfig,
  uploadables
) {
  return fetch(`${getPrefix()}/graphql`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(res => res.json())
}

const source = new RecordSource()
const store = new Store(source)
const network = Network.create(fetchQuery)
const handlerProvider = null

const environment = new Environment({
  handlerProvider,
  network,
  store
})

export { environment }
