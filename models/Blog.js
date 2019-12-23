const mongoose=require('mongoose');

const BlogSchema=new mongoose.Schema ({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
        minlength:10
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

const Blog=mongoose.model('Blog',BlogSchema);
module.exports=Blog;