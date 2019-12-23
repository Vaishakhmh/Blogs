import React,{Component} from 'react'
import SingleBlog from '../Components/singleBlog'
import {connect} from 'react-redux'
import {getBlog} from '../store/Actions/blogAction'
import AddIcon from '@material-ui/icons/Add';
//import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import {Link} from 'react-router-dom'
import Loading from '../Components/Loading';
class Home extends Component{
    state={
        loading:true
    }
    componentDidMount=()=>{
        if(!this.props.auth.isAuthenticated)
        {
            this.props.history.push('/login');
        }
      this.props.Blogs();
    }
     render(){    
         let content=this.props.blog.posts;
           content=content.map(blog =>(<SingleBlog key={blog._id} title={blog.title} owner={blog.owner} id={blog._id} content={blog.content} createdat={blog.createdAt}/>))
         if(content.length==0)
         {
             content=<h3>Oops there are no blogs for now </h3>
         }
         return (<div>
             <Fab aria-label="like" color="primary" component={Link} to="/newblog">
         <AddIcon />
       </Fab >
            {content}
            </div>
         )
     }
 }
 const mapDispatchToProps=(dispatch)=>({
     Blogs:()=>dispatch(getBlog())
 })
 const mapStateToProps=(state)=>({
     auth:state.authReducer,
     blog:state.blogReducer
 })
 
 export default connect(mapStateToProps,mapDispatchToProps)(Home);



