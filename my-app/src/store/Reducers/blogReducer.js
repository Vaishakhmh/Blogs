import {GET_BLOG} from '../Actions/actionTypes'

const initialState={
    posts:[]
}

export default function (state=initialState,action){
         switch(action.type){
        case GET_BLOG:{
             return {
                 ...state,
                posts:action.payload
                }
            }
                default:return state;           
            }
        }