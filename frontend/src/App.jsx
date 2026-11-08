import { useState } from 'react'
import { gql } from '@apollo/client'
import { useQuery, useMutation, useApolloClient } from '@apollo/client/react'
import Login from './components/Login'
import AddRecipe from './components/AddRecipe'
import SavedRecipes from './components/SavedRecipes'

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

const SAVE_RECIPE = gql`
  mutation SaveRecipe($recipeId: ID!) {
    saveRecipe(recipeId: $recipeId) {
      _id
    }
  }
`

function App() {
  const client = useApolloClient()
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))
  const { loading, error, data } = useQuery(GET_RECIPES)
  const [saveRecipe, { error: saveError }] = useMutation(SAVE_RECIPE, {
    refetchQueries: ['GetMe'],
  })

  function handleLogin() {
    setLoggedIn(true)
    client.resetStore()
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setLoggedIn(false)
    client.resetStore()
  }

  function handleSave(recipeId) {
    saveRecipe({ variables: { recipeId } }).catch(() => {})
  }

  return (
    <div>
      <h1>Recetario</h1>

      {loggedIn ? (
        <button onClick={handleLogout}>Log out</button>
      ) : (
        <Login onLogin={handleLogin} />
      )}

      {loggedIn && <AddRecipe />}
      {loggedIn && <SavedRecipes />}

      <h2>All recipes</h2>
      {loading && <p>Loading recipes...</p>}
      {error && <p>Error: {error.message}</p>}
      {saveError && <p>{saveError.message}</p>}
      {data && data.recipes.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.countryOfOrigin}, posted by {recipe.author.username}</p>
          {loggedIn && (
            <button onClick={() => handleSave(recipe._id)}>Save</button>
          )}
        </div>
      ))}
    </div>
  )
}

export default App