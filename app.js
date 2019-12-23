const express=require('express');
require('./mongoose');
const bodyparser=require('body-parser');
const graphqlHttp=require('express-graphql');
const GraphSchema=require('./Graphql/Schema/Schema');
const GraphResolver=require('./Graphql/Resolvers/Index');
const isAuth =require('./middleware/is-auth');
const app=express();
const PORT=process.env.PORT||5000

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE');
      return res.status(200).json({});
    }
    return next();
  });
  

app.use(bodyparser());
app.use(isAuth);

app.use('/api',
graphqlHttp({
    schema:GraphSchema,
    rootValue:GraphResolver,
    graphiql:true
})
)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'my-app', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname,'my-app', 'build', 'index.html')
    );
  });
}


app.listen(PORT,()=>{
    console.log('server is up');
})



