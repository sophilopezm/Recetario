# Recetario

A community recipe book where users share family recipes tagged by country of origin and save recipes posted by others.

## Tech Stack

React (Vite), Apollo Client, Node.js, Express.js, Apollo Server, GraphQL, MongoDB Atlas, Mongoose, JWT, bcrypt

## Features

- Register and log in (all other pages require an account)
- View all recipes, a single recipe, or recipes filtered by country
- Post a recipe
- Save recipes and view your own saved list

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
- `login(username, password)`
- `addRecipe(title, countryOfOrigin, ingredients, ...)`
- `saveRecipe(recipeId)`

## Running Locally

Backend (requires a `.env` file in `backend/` with `MONGO_URI`, `JWT_SECRET`, and `PORT`):

    cd backend
    npm install
    npm run dev

Frontend:

    cd frontend
    npm install
    npm run dev

## Retrospective

### What went well

Once the backend was working, connecting the frontend went quickly. Each query and mutation followed the same pattern with useQuery and useMutation, so adding features got faster as I went.

### What was challenging

Most of my bugs were setup issues, not code. Atlas blocked my connection every time I switched Wi-Fi networks until I updated the IP access list, and I hit a DNS error with the default connection string that I fixed by switching to the standard (non-SRV) one. Understanding how the login token moves from the backend to localStorage and back into each request also took some time.

### What I would add next

Letting users edit and delete their own recipes. This would need two new mutations that check the logged-in user is the recipe's author before making changes.
