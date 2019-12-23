const jwt=require('jsonwebtoken');
const User=require('../../models/User');
const bcrypt=require('bcryptjs');
module.exports={
    createUser:async(args)=>{
        try{
        const existingUser=await User.findOne({email:args.UserInput.email})
        if(existingUser)
        {
            throw new Error('Email is already in user');
        }
        const user=new User({
            name:args.UserInput.name, 
            email:args.UserInput.email,
            password:args.UserInput.password
        })
        await user.save()
        const token=jwt.sign({userId:user.id,email:user.email},'secretkey',{expiresIn:'1h'});
        return { userId: user.id, token: token, tokenExpiration: 1}
    }catch(err)
    {
        throw new Error(err);
    }
},
login:async({email,password})=>{
    
        
    const user=await User.findOne({email:email});
    if(!user)
    {
        
        throw new Error('Invalid Credentials');
    }
    const correctPass=await bcrypt.compare(password,user.password);
    if(!correctPass)
    {

        throw new Error('Invalid Credentials');
    }
    const token=jwt.sign({userId:user.id,email:user.email},'secretkey',{expiresIn:'1h'});
    return { userId: user.id, token: token, tokenExpiration: 1}
}

}
