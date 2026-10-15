const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Recipe = require('../models/Recipe');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.userId) throw new Error('You must be logged in');
            return User.findById(context.userId).populate('savedRecipes');
        },

        recipes: async () => {
            return Recipe.find().sort({ createdAt: -1 }).populate('author');
        },

        recipe: async (parent, { recipeId }) => {
            return Recipe.findById(recipeId).populate('author');
        },

        recipesByCountry: async (parent, { country }) => {
            return Recipe.find({ countryOfOrigin: country })
                .sort({ createdAt: -1 })
                .populate('author');
        },
    },

    Mutation: {
        register: async (parent, { username, email, password }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hashedPassword });
            return jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        },

        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) throw new Error('User not found.');

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new Error('Invalid password');

            return jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        },

        addRecipe: async (parent, args, context) => {
            if (!context.userId) throw new Error('You must be logged in');
            const recipe = await Recipe.create({ ...args, author: context.userId });
            return recipe.populate('author');
        },

        saveRecipe: async (parent, { recipeId }, context) => {
            if (!context.userId) throw new Error('You must be logged in');

            const recipe = await Recipe.findById(recipeId);
            if (!recipe) throw new Error('Recipe not found');

            return User.findByIdAndUpdate(
                context.userId,
                { $addToSet: { savedRecipes: recipeId } },
                { returnDocument: 'after' }
            ).populate('savedRecipes');
        },
    },
};

module.exports = resolvers;