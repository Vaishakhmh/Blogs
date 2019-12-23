const { buildSchema } = require('graphql');
module.exports=  buildSchema (`
    type User {
        _id:ID!
        name:String!
        email:String!
        password:String
        blogs:[Blog!]
    } 
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }  
    input UserInput {
        name:String!
        email:String!
        password:String!
    }
    type Blog {
        _id:ID!
        title:String!
        content:String!
        owner:User!
        createdAt:String!
        updatedAt:String!
    }
    input BlogInput {
        title:String!
        content:String!
    }
    type RootQuery {
            login(email:String! password:String!):AuthData!
            blogs:[Blog!]!
    }
    type RootMutation{
           createUser(UserInput:UserInput):AuthData!
           createBlog(BlogInput:BlogInput):Blog
           deleteBlog(BlogId:ID!):Blog
    }
    schema {
        query :RootQuery
        mutation :RootMutation
    }
    `)