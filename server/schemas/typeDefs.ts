import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User {
        _id: ID!
        email: String!
        username: String!
        birthday: String!
        propic: String
        status: String
        customStatus: String
        expireDate: String
        friends: [friend]
    }

    type friend {
        user: User
        status: Int
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        allUsers: [User]
        me: User
        getFriends: User
        oneUser (username: String!): User
    }

    type Mutation {
        register(email: String!, username: String!, password: String!, birthday: String!): Auth
        login(email: String!, password: String!): Auth
        sendPassword(email: String!): User
        changePassword(id: String!, token: String!, password: String!): User
        updateStatus(status: String!): User
        sendFriend(username: String!): User
        getFriend(id: String!): User
        acceptFriend(id: String!): User
        removeFriend(id: String!): User
        customStatus(customStatus: String!, expireDate: String!): User
    }
`;

export default typeDefs;