import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { loginUser } from '../store/Actions/authActions';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {EMPTY_ERRORS, GET_ERRORS} from '../store/Actions/actionTypes'
import {isEmptyLogin} from '../isEmpty'

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: theme.spacing.unit * 50,
    backgroundColor: 'theme.palette.background.paper',
    boxShadow: theme.shadows[5]
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  link: {
    textDecoration: 'none'
  },
  footer: {
    marginTop: theme.spacing.unit * 2
  },
  errorText: {
    color: '#D50000',
    marginTop: '5px'
  }
});

class LoginPage extends Component {
 state={
  email:"",
  password:"",
  errors:{}
}
handleInputChange=(e)=>{
  const {name,value}=e.target;
  this.setState(()=>({[name]:value}));
}
handleSubmit=(e)=>{
  e.preventDefault();
  const validation=isEmptyLogin(this.state)
  if(validation)
  {
    this.props.validateerrors(validation);
  }
  else{
  const {email,password}=this.state;
  const user ={
    email,
    password
  };
  const { signInUser } = this.props;
  signInUser(user);
}
}
componentDidMount=()=>{
  this.props.emptyerrors();
}
 componentDidUpdate=()=>{
   if(this.props.auth.isAuthenticated)
   {
     this.props.history.push('/home');
   }
 }
  render(){
    const errors=this.props.errors
    let login_mess='please login';
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
          <h3>{login_mess}</h3>
            <Avatar className={classes.avatar}>
            </Avatar>
            <Typography variant="h5">Log In</Typography>
            <form onSubmit={this.handleSubmit} noValidate>
               <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  onChange={this.handleInputChange}
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus 
                  error={errors.error} 
                 />
                 <span className={classes.errorText}></span>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  onChange={this.handleInputChange}
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={errors.error}
                />
              </FormControl>
              <span className={classes.errorText}>{errors.error}</span>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log In
              </Button>
            </form>
            <Typography className={classes.footer} variant="body1">
              {"Don't have an account? "}
              <NavLink to="/signup" className={classes.link}>
                Sign Up
              </NavLink>
            </Typography>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps=(state)=>({
  auth: state.authReducer,
  errors: state.errorReducer
})
const mapDispatchToProps=dispatch=>({
  signInUser: (user) => dispatch(loginUser(user)),
  emptyerrors:()=>dispatch({
    type:EMPTY_ERRORS
  }),
  validateerrors:(validation)=>dispatch({
    type:GET_ERRORS,
    payload:validation
  })
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginPage);