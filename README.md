# Recetario

A community recipe book where users share family recipes tagged by country of origin and save recipes posted by others.

## Tech Stack

MongoDB Atlas, Mongoose, Express.js, Node.js, GraphQL, Apollo Server, JWT, bcrypt. React front end planned for later.

## MVP

- Register and log in
- View all recipes, a single recipe, or recipes filtered by country
- Post a recipe (logged in)
- Save another user's recipe (logged in)

## Data Models

**User**: username, email, password (hashed), savedRecipes

**Recipe**: title, description, countryOfOrigin, ingredients, instructions, prepTime, author, createdAt

## GraphQL

### Types

- User
- Recipe

### Queries

- `me`
- `recipes`
- `recipe(recipeId)`
- `recipesByCountry(country)`

### Mutations

- `register(username, email, password)`
- `login(email, password)`
- `addRecipe(title, countryOfOrigin, ingredients, ...)`
- `saveRecipe(recipeId)`
