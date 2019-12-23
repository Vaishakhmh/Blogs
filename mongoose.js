const mongoose=require('mongoose');
//const config=require('config')
const dbURI = process.env.REACT_APP_DB_URI || require('./secrets').dbURI;


mongoose.connect(dbURI,{
useNewUrlParser:true,
useUnifiedTopology: true,
useCreateIndex:true
}   
);


module.exports=mongoose;