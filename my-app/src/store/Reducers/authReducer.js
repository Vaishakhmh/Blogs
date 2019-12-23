

import {SET_CURRENT_USER} from '../Actions/actionTypes'
const initialState={
    isAuthenticated:false,
    user:''
}
const  authReducer=(state=initialState,action)=>{
    switch (action.type){
        case SET_CURRENT_USER:{
            let auth=false;
            if(action.payload)
            {
                auth=true;
            }
            return {
                ...state,
                isAuthenticated:auth,
                user:action.payload.userId
            }
        }
            default:
                return state;
    }
   }
export default authReducer;