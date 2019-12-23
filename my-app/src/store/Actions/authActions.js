import axios from 'axios'
import {SET_CURRENT_USER,
        GET_ERRORS} from './actionTypes';
import '../../setAuthToken';
import setAuthToken from '../../setAuthToken';

export const loginUser=(user)=>(dispatch)=>{
    axios.post('/api', {
        query: `query login($email: String!, $password: String!) {
          login(email: $email, password: $password){
            userId
            token
            tokenExpiration
          }
        }`,
        variables: {
          email: user.email,
          password: user.password
        }
      }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
            const data=res.data.data.login;
        const token=data.token;
        localStorage.setItem('jwtToken',token);
        setAuthToken(token);
        dispatch(set_current_user(data))  
    }).catch((err) => {
        const errors=err.response.data.errors[0].message;
        dispatch({
            type:GET_ERRORS,
            payload:errors
        });
        })
}

export const set_current_user=(data)=>({
    type:SET_CURRENT_USER,
    payload:data
})


export const logout_user=()=>(dispatch)=>{
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(set_current_user({}));
  window.location.href='/';
}

export const signUp=(user)=>(dispatch)=>{
  axios.post('/api',{
    query:`mutation ($name:String!,$email:String!,$password:String! ){
          createUser(UserInput:{name:$name,email:$email,password:$password}){
            userId
            token
            tokenExpiration
          }      
    }`,variables:{
      name:user.name,
      email:user.email,
      password:user.password
    },
        headers: {
          'Content-Type': 'application/json'
        } 
  }).then((res)=>{
    const data=res.data.data.createUser;
        const token=data.token;
        localStorage.setItem('jwtToken',token);
        setAuthToken(token);
        dispatch(set_current_user(data))
  }).catch((err)=>{
    const errors=err.response.data.errors[0].message;
     dispatch({
       type:GET_ERRORS,
       payload:errors
   });
    })
}