
import {GET_ERRORS,EMPTY_ERRORS}  from '../Actions/actionTypes'

const initialState={};

export default function (state=initialState,action)
{
    switch (action.type)
    {
        case GET_ERRORS:{
            return {
                error:action.payload
                }
            }
        case EMPTY_ERRORS:{
            return {}
        }
            default:
                return state;
    }
}
