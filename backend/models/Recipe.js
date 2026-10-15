const { model, Schema } = require('mongoose');

const RecipeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    countryOfOrigin: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String }],
    prepTime: { type: Number },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = model('Recipe', RecipeSchema);