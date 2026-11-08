import { useState } from 'react'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

const GET_RECIPES_BY_COUNTRY = gql`
  query GetRecipesByCountry($country: String!) {
    recipesByCountry(country: $country) {
      _id
      title
      author {
        username
      }
    }
  }
`

function CountryFilter({ onSelect }) {
  const [input, setInput] = useState('')
  const [country, setCountry] = useState('')

  const { loading, error, data } = useQuery(GET_RECIPES_BY_COUNTRY, {
    variables: { country },
    skip: !country,
  })

  function handleSubmit(event) {
    event.preventDefault()
    setCountry(input.trim())
  }

  return (
    <div>
      <h2>Find recipes by country</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="e.g. Venezuela"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Searching...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.recipesByCountry.length === 0 && (
        <p>No recipes from {country} yet.</p>
      )}
      {data && data.recipesByCountry.map((recipe) => (
        <p key={recipe._id}>
          {recipe.title}, posted by {recipe.author.username}{' '}
          <button onClick={() => onSelect(recipe._id)}>View recipe</button>
        </p>
      ))}
    </div>
  )
}

export default CountryFilter