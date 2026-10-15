const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        savedRecipes: [Recipe]
    }

    type Recipe {
        _id: ID!
        title: String!
        description: String
        countryOfOrigin: String!
        ingredients: [String]!
        instructions: [String]
        prepTime: Int
        author: User
        createdAt: String
    }

    type Query {
        me: User
        recipes: [Recipe]
        recipe(recipeId: ID!): Recipe
        recipesByCountry(country: String!): [Recipe]
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): String
        login(username: String!, password: String!): String
        addRecipe(
            title: String!
            description: String
            countryOfOrigin: String!
            ingredients: [String]!
            instructions: [String]
            prepTime: Int
        ): Recipe
        saveRecipe(recipeId: ID!): User
    }
`;

module.exports = typeDefs;