import { USER_LOGIN, USER_LOGOUT, USER_REGIST } from '../constants/user'
import { Map } from 'immutable'

enum LOGIN_STATUS {
    NOT_LOGIN,
    LOGED,
    // not used for now
    REGISTERED,
}

enum PRIVILLEGES_TYPES {
    GIRLS_READ,
    GIRLS_WRITE,
    LOCKED
}

const initial = Map({
    status: LOGIN_STATUS.NOT_LOGIN,
    profile: {
        id: '',
        name: '',
        email: '',
        privilleges: [PRIVILLEGES_TYPES.GIRLS_READ, PRIVILLEGES_TYPES.GIRLS_WRITE]
    }
})

const userReducer = (state = initial, action: any) => {
    switch (action.type) {
        case USER_LOGIN:
            return state.update('profile', v => action.user).update('status', s => LOGIN_STATUS.LOGED)
        case USER_LOGOUT:
            return state.update('profile', v => ({
                id: '', name: '', email: '', privilleges: []
            })).update('status', s => LOGIN_STATUS.NOT_LOGIN)
        case USER_REGIST:
            return state.update('profile', v => action.user).update('status', s => LOGIN_STATUS.LOGED)
        default:
            return state

    }
}

export default userReducer





