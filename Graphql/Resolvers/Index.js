const AuthResolver=require('./Auth');
const BlogResolver=require('./Blog');

const RootResolver={
    ...AuthResolver,
    ...BlogResolver
}

module.exports=RootResolver;