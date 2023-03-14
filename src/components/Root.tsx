import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useQuery } from '@apollo/client'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { updateCategories } from '../actions/category'
import Header from './header/Header'
import { useInitialQuery } from '../schema/generated'

const BodyContainer = styled.div`
    display: flex;
    flex: 1;
`

function Root(props: any) {
  const q = useInitialQuery({
    variables: {
      from: 2,
      take: 20,
      last: (1 << 20).toString(),
    }
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (!q.data) {
      return
    }
    dispatch(updateCategories(q.data.categories))
  }, [q.data])
  return (
    <div className='flex flex-col min-h-screen dark:bg-gray-900 bg-purple-700'>
      <Header />
      <TransitionGroup className="transition-group">
        <CSSTransition
          // key={props.location.key}
          component={BodyContainer}
          classNames="slide" timeout={350}>
          {props.children}
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default Root
