import React ,{Component}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles'
import { Typography,FormControl,Button } from '@material-ui/core';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {createBlog} from '../store/Actions/blogAction';
import {EMPTY_ERRORS,GET_ERRORS} from '../store/Actions/actionTypes'


const styles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 'auto',
      margin:'25px',
      display: 'block'
    },
  },
  main:{
      textAlign:'center'
  },
  multi:{
      width:'80%',
  },
  errorText: {
    color: '#D50000',
    marginTop: '5px'
  }
});
 class newBlog extends Component {
    state={
        title:"",
        content:""
    }
      componentDidMount=()=>{
        this.props.emptyerrors();
          if(!this.props.auth.isAuthenticated)
          {
            this.props.history.push('/login');
          }
     }
     handleInputChange=(e)=>{
        const {name,value}=e.target;
  this.setState(()=>({[name]:value}));
     }
     submitHandler=(e)=>{
         const {title,content}=this.state;
         const blog={
             title,
             content
         }
         if(content.length<10)
         {
           this.props.validator('Content Must be atleast 10 Character Long');
         }
         else if(!title)
         {
           this.props.validator('Title to your blog must be provided');
         }
         else {
         this.props.createBlog(blog)
         this.props.history.push('/Home');
         }
     }
     render(){
        const errors=this.props.errors
         const {classes} = this.props
        return(
            <div className={classes.main}>
            <Typography variant="h3">New Blog</Typography>
            <form className={classes.root} noValidate autoComplete="off">
            <FormControl margin="normal" required fullWidth>
            <TextField 
            name="title"
            id="outlined-basic" 
            label="Title" 
            variant="outlined"
            onChange={this.handleInputChange} 
            />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
             <TextField className={classes.multi}
             name="content"
            id="filled-textarea"
            label="Content"
            placeholder="press Return for new line"
            multiline
            variant="outlined"
            onChange={this.handleInputChange} 

        />                   
         </FormControl>
            </form>
            <h5 className={classes.errorText}>{errors.error}</h5>
            <Button variant="contained" color="primary" onClick={this.submitHandler}>Publish</Button> 
            </div>
         )
     }
}

const mapDispatchToProps=(dispatch)=>({
    createBlog:(blog)=>dispatch(createBlog(blog)),
    emptyerrors:()=>dispatch({
        type:EMPTY_ERRORS
    }),
    validator:(message)=>dispatch({
      type:GET_ERRORS,
      payload:message
    })
})

const mapStateToProps=(state)=>({
    auth:state.authReducer,
    errors:state.errorReducer

})

export default compose(
    withStyles(styles),
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(newBlog);
