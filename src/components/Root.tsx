import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useQuery } from '@apollo/client'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { updateCategories } from '../actions/category'
import initialQuery from '../schema/categoriesQuery.graphql'

import { liteYellow, liteBlue } from '../styles/variables'

import Header from './header/Header'
import { initialVariables, initial } from '../types/initial'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100vh;
    background: linear-gradient(45deg, ${liteYellow}, ${liteBlue});
`

const BodyContainer = styled.div`
    display: flex;
    flex: 1;
`

function Root(props: any) {

  const q = useQuery<initial, initialVariables>(initialQuery, {
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
      <Container>
        <Header />
          <TransitionGroup className="transition-group">
            <CSSTransition
              // key={props.location.key}
              component={BodyContainer}
              classNames="slide" timeout={350}>
              {props.children}
            </CSSTransition>
          </TransitionGroup>
      </Container>
  )
}

// @connect(state => ({
//   categories: state.app.categories
// }), dispatch => ({
//   updateCategories(categories) { return dispatch(updateCategories(categories)) }
// }))
// @withApollo
// class Root extends React.Component {

//   static propTypes = {
//     client: PropTypes.any.isRequired,
//     updateCategories: PropTypes.func,
//     children: PropTypes.element,
//     match: PropTypes.any,
//     categories: PropTypes.any
//   }

//   componentDidMount() {
//     this.props.client.query({
//       query: initialQuery
//     }).then(result => {
//       this.props.updateCategories(result.data.categories)
//     })
//   }

//   render() {
//     const { children, location } = this.props
//     return (
//       <Container>
//         <Header categories={this.props.categories} />
//           <TransitionGroup className="transition-group">
//             <CSSTransition
//               key={location.key}
//               component={BodyContainer}
//               classNames="slide" timeout={350}>
//               {children}
//             </CSSTransition>
//           </TransitionGroup>
//       </Container>
//     )
//   }
// }

export default Root
