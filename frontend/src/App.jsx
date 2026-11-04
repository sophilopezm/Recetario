import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      _id
      title
      countryOfOrigin
      author {
        username
      }
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_RECIPES)

  if (loading) return <p>Loading recipes...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>Recetario</h1>
      {data.recipes.map((recipe) => (
        <div key={recipe._id}>
          <h2>{recipe.title}</h2>
          <p>{recipe.countryOfOrigin}, posted by {recipe.author.username}</p>
        </div>
      ))}
    </div>
  )
}

export default App