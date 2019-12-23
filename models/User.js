const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    blogs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Blog"
        }
    ]
})

UserSchema.pre('save',async function (next){
     user=this;
     if(user.isModified('password'))    
     {
     user.password=await bcrypt.hash(user.password,8);
     }
   next();
})

const User=mongoose.model('User',UserSchema);
module.exports=User;