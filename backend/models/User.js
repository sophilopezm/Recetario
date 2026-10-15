const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
});

module.exports = model('User', UserSchema);