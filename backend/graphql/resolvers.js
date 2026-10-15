const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const resolvers = {
    Query: {
        hello: () => 'hello from the backend template!',

        me: (parent, args, context) => {
            return context.userId || 'Not logged in';
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
    },
};

module.exports = resolvers;