import {combineReducers} from 'redux'

import authReducer from './authReducer';
import errorReducer from './errorReducer'
import blogReducer from './blogReducer'

export default combineReducers({
    authReducer,
    errorReducer,
    blogReducer
})