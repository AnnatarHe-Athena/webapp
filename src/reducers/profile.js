import { fromJS } from 'immutable'

const init = fromJS({
    info: {}
})

function profileReducer(state = init, action) {
    switch(action.type) {
        case '':
            return state
        default:
            return state
    }
}

export default profileReducer