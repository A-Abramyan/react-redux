import { USER_REGISTRATION } from '../type'

const initialState = [{
    email: '',
    password: '',
    userName: ''
}]
export const registrationReducer = (state = initialState, action) => {

    switch (action.type) {
        case USER_REGISTRATION:
            return [...state.concat(...action.payload)]

        default: return state
    }

}