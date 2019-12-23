export const isEmptySignup=(data)=>{
let flag=null;
if(!data.name)
{
    flag='Name'
}       
if(!data.email)
{
   if(flag=='Name')
   {
       flag='Name&Email'
   }
   else flag='Email'
}
if(!data.password)
{
    if(flag=='Name')
    {
        flag='Name&Password'
    }
   else if(flag=='Email')
    {
        flag='Email&Password'
    }
   else if(flag=='Name&Email')
    {
        flag='Name&Email&Password'
    }
    else flag='Password'
}
if(flag)
{
flag=flag+' is Required'
}
return flag;
}

export const isEmptyLogin=(user)=>{
 let   flag=null;
    if(!user.email)
    {
        flag='Email'
    }
    if(!user.password)
    {
        if(flag=='Email')
        {
            flag='Email&Password'
        }
        else flag='Password'
    }
    if(flag)
    {
        flag=flag +' is Required'
    }
    return flag;
}