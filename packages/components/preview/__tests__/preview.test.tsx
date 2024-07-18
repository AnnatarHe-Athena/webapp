import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Preview from '../Preview'
import { apolloClient } from '@athena/network/apollo'
import store from '../../../store/index'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import { VenusSource } from '@athena/network/_g/graphql'

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
        <Provider store={store}>
          <Preview
            data={{
              cell: {
                __typename: 'Girl',
                id: '1',
                img: 'http://xxx.x/xxx',
                content: '',
                isCollected: false,
                text: '',
                permission: 2,
                fromID: '',
                fromURL: '',
                venus: {
                  __typename: 'Venus',
                  id: 1,
                  uid: '1',
                  name: 'xxx',
                  bio: 'xxx',
                  source: VenusSource.Weibo,
                  avatar: '',
                  remarks: '',
                }
              },
              onClose: () => { }
            }}
            visible
            onClose={() => { }}
          />
        </Provider>
      </ApolloProvider>
    )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
