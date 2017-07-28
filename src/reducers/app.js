import { fromJS } from 'immutable'

const init = fromJS({
  category: 0
})

const reducer = (state = init, action) => {
  switch (action.type) {
    case 'hello':
      return state
      break;
    default:
      return state
  }
}

export default reducer

