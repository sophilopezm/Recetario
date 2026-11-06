import { useState } from 'react'
import { gql } from '@apollo/client'
import { useQuery, useApolloClient } from '@apollo/client/react'
import Login from './components/Login'

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
  const client = useApolloClient()
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))
  const { loading, error, data } = useQuery(GET_RECIPES)

  function handleLogin() {
    setLoggedIn(true)
    client.resetStore()
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setLoggedIn(false)
    client.resetStore()
  }

  return (
    <div>
      <h1>Recetario</h1>

      {loggedIn ? (
        <button onClick={handleLogout}>Log out</button>
      ) : (
        <Login onLogin={handleLogin} />
      )}

      <h2>All recipes</h2>
      {loading && <p>Loading recipes...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.recipes.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.countryOfOrigin}, posted by {recipe.author.username}</p>
        </div>
      ))}
    </div>
  )
}

export default App