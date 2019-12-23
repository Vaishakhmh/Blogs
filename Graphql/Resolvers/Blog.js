const Blog=require('../../models/Blog');
const User=require('../../models/User');
const {transformBlog}=require('./merge')

module.exports= {

    blogs:async(args,req)=>{
        try{
            if(!req.isAuth)
            {
                throw new Error('not Authenticated');
            }

            const blogs=await Blog.find();
            
            return blogs.map((blog)=>{
                return transformBlog(blog);
            })
        }catch(err)
        {
            throw new Error(err);
        }
    },
    createBlog:async(args,req)=>{
        try{
            if(!req.isAuth)
            {
                throw new Error('not Authenticated');
            }
         
            const blog=new Blog({
                title:args.BlogInput.title,
                content:args.BlogInput.content,
                owner:req.userId
            })
            const result=await blog.save();''
            let createdBlog=transformBlog(result);
            const owner=await User.findById(req.userId);
            if(!owner)
            {
                throw new Error('User Not found');
            }
            owner.blogs.push(blog);
            await owner.save();
            return createdBlog;
        }catch(err)
        {
            throw new Error(err);
        }
    },
    deleteBlog:async(args,req)=>{
        try{
            if(!req.isAuth)
            {
                throw new Error('not Authorized');
            }
            const blog=await Blog.findById(args.BlogId)
            const user=await User.findById(blog.owner);
            const newBlogs=user.blogs.filter((blg)=>{
               return blog._id!==blg
            })
            user.blogs=newBlogs;
            await user.save();
            await blog.deleteOne({_id:args.blogId});
            return blog;
        }catch(err)
        {
            throw new Error(err);
        }
    } 
    }


