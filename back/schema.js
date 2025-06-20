import graphql from 'graphql-tag'

export const typeDefs = graphql`

    type User{
        id : ID!,
        name : String!,
        email : String!,
    }

    type Query {
        users : [User]
    }

    type Mutation {
        AddUser(name : String!,email : String!):User
        
        deleteUser(id:ID): Boolean
    }
`;

