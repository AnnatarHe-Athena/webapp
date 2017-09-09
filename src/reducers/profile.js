import { fromJS } from 'immutable'
import {
    PROFILE_GOT
} from '../constants/auth'

const init = fromJS({
    info: {}
})

function profileReducer(state = init, action) {
    switch(action.type) {
        case PROFILE_GOT:
            return state.update('info', _ => fromJS(action.profile))
        default:
            return state
    }
}

export default profileReducer
