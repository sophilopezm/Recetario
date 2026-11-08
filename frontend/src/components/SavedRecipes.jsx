import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

const GET_ME = gql`
  query GetMe {
    me {
      _id
      username
      savedRecipes {
        _id
        title
        countryOfOrigin
      }
    }
  }
`

function SavedRecipes() {
  const { loading, error, data } = useQuery(GET_ME)

  if (loading) return <p>Loading your saved recipes...</p>
  if (error) return <p>Error: {error.message}</p>

  const { username, savedRecipes } = data.me

  return (
    <div>
      <h2>{username}'s saved recipes</h2>
      {savedRecipes.length === 0 ? (
        <p>No saved recipes yet.</p>
      ) : (
        savedRecipes.map((recipe) => (
          <p key={recipe._id}>
            {recipe.title} ({recipe.countryOfOrigin})
          </p>
        ))
      )}
    </div>
  )
}

export default SavedRecipes