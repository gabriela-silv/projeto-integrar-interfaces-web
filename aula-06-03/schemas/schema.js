const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type Task{
        id: ID!
        title: String!
        finished: Boolean!

}

    type Query{
        tasks: [Task]
    }

    type Mutation{
        createTask(title: String!): Task
        updateTask(id: ID!, title:String, finished: Boolean): Task
        deleteTask(id : ID!): Boolean

    }

`;

module.exports = {typeDefs}