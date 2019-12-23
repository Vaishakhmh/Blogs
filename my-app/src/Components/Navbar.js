import React from 'react'
import Appbar from '@material-ui/core/Appbar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import {Link }from 'react-router-dom'
import {connect} from 'react-redux'
import {logout_user} from '../store/Actions/authActions';


const Navbar=(props)=>{
     let show='';
     if(props.auth.isAuthenticated)
     {
         show=<Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/Home">Blogs</Button>  
        <Button color="inherit"  onClick={props.logoutUser}>Logout</Button> 
        
        </Toolbar>
     }
     else show=<Toolbar>
          <Button color="inherit"component={Link} to="/login">Login</Button>
          <Button color="inherit"component={Link} to="/signup">Signup</Button>
     </Toolbar>
    return (
        <Appbar>
          {show}
        </Appbar>
        )
}

const mapDispatchToProps=(dispatch)=>({
  logoutUser: ()=>dispatch(logout_user())

})

const mapStateToProps=(state)=>({
    auth:state.authReducer
})


export default connect(mapStateToProps,mapDispatchToProps)(Navbar);