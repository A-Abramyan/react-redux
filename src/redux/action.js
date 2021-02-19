import { POST_ADD, USER_REGISTRATION } from './type'

export const userRegistration = (createUser) =>
    dispatch => {
        dispatch({
            type: USER_REGISTRATION,
            payload: [createUser]
        })

    }
export const postAdding = (createPost) =>
    dispatch => {
        dispatch({
            type: POST_ADD,
            payload: [createPost]
        })
    }
