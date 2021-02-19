import { POST_ADD } from '../type'

const initialState = [{
    post: '',
    postFilter: ''
}]
export const postAdding = (state = initialState, action) => {
    switch (action.type) {
        case POST_ADD:
            return [...state.concat(...action.payload)]

        default: return state
    }

}
