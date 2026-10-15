const typeDefs = `
    type Query {
        hello: String
        me: String
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): String
        login(username: String!, password: String!): String
    }
`;

module.exports = typeDefs;