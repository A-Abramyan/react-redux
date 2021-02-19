import { combineReducers } from "redux";
import { postAdding } from "../reducer/postReducer";
import { registrationReducer } from './registrationReducer';



export const rootReducer = combineReducers({
    registration: registrationReducer,
    post: postAdding

})