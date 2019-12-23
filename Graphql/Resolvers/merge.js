const Blog=require('../../models/Blog');
const User=require('../../models/User');

const dateToString = date => new Date(date).toISOString();
const blogs = async blogIds => {
    try {
      const blogs = await Blog.find({ _id: { $in: blogIds } });
      return blogs.map(blog => {
        return transformBlog(blog);
      });
    } catch (err) {
      throw err;
    }
  };  

const owner = async userId => {
    try {
      const user = await User.findById(userId);
      return {
        ...user._doc,
        _id: user.id,
        blogs: blogs.bind(this, user._doc.blogs)
      };
    } catch (err) {
      throw err;
    }
  };

const transformBlog = blog => {
    return {
      ...blog._doc,
      _id: blog.id,
      owner: owner.bind(this, blog.owner),
      createdAt: dateToString(blog._doc.createdAt),
      updatedAt: dateToString(blog._doc.updatedAt)
    };
  };
 
  exports.transformBlog=transformBlog;
  