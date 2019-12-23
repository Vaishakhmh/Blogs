import axios from 'axios'
import { GET_BLOG,GET_ERRORS} from './actionTypes';

export const getBlog=()=>dispatch=>{
    axios.post('/api',{
        query: `query{
            blogs{
              _id
              title
              owner
            {
              _id
              name
            }
              content
              createdAt
            }
            }`,
        }, {
            headers: {
              'Content-Type': 'application/json',
            }
    }).then((res)=>{
      //return (res.data.data.blogs);
       let blogs=res.data.data.blogs;
        dispatch({
           type:GET_BLOG,
           payload:blogs
       })
    }).catch((err)=>{
      const errors=err.response.data.errors[0].message;
      dispatch({
        type:GET_ERRORS,
        payload:errors
      });
    })
}

export const  createBlog=(blog)=>dispatch=>{
  axios.post('/api',{
      query: `mutation ($title:String!,$content:String!) {
        createBlog(BlogInput:{title: $title, content: $content}){
          title
        }
      }`,
      variables: {
        title: blog.title,
        content: blog.content
      }
    }, {
        headers: {
          'Content-Type': 'application/json'
        } 
      }).then((res)=>{
        if(res.data.errors)
        {
          
          const errors=res.data.errors[0].message;
          dispatch({
            type:GET_ERRORS,
            payload:errors
          });
        }
      }).catch((err)=>{
        const errors=err.response.data.errors[0].message;
        dispatch({
          type:GET_ERRORS,
          payload:errors
        });    
        })
}

export const deleteBlog=(id)=>dispatch=>{
  axios.post('/api',{
    query: `mutation deleteBlog($BlogId:ID!){
        deleteBlog(BlogId:$BlogId){
          title
          _id
        }
      }`,
    variables: {
      BlogId:id
    }
  }, {
      headers: {
        'Content-Type': 'application/json'
      }
  }).then(()=>{
    dispatch(getBlog());
  }).catch((err)=>{
    console.log(err.response);
  })
}