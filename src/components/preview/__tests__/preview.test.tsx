import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Preview from '../Preview'
import { apolloClient } from '../../../setup/apollo'
import store from '../../../store/index'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'

describe('preview will ok', () => {
  beforeAll(() => {
    (ReactDOM as any).createPortal = jest.fn((element, node) => {
      return element
    })
  })

  afterEach(() => {
    (ReactDOM as any).createPortal.mockClear()
  })
  it('should be ok', () => {
    const tree = renderer.create(
      <ApolloProvider client={apolloClient}>
        <ApolloHooksProvider client={apolloClient}>
          <Provider store={store}>
            <Preview data={{}} visible onClose={() => { }} />
          </Provider>
        </ApolloHooksProvider>
      </ApolloProvider>
    )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
