import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

const GET_RECIPE = gql`
  query GetRecipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      _id
      title
      description
      countryOfOrigin
      ingredients
      instructions
      prepTime
      author {
        username
      }
    }
  }
`

function RecipeDetail({ recipeId, onBack }) {
  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: { recipeId },
  })

  if (loading) return <p>Loading recipe...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data.recipe) return <p>Recipe not found.</p>

  const recipe = data.recipe

  return (
    <div>
      <button onClick={onBack}>Back to all recipes</button>
      <h2>{recipe.title}</h2>
      <p>{recipe.countryOfOrigin}, posted by {recipe.author.username}</p>
      {recipe.description && <p>{recipe.description}</p>}
      {recipe.prepTime && <p>Prep time: {recipe.prepTime} minutes</p>}

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  )
}

export default RecipeDetail