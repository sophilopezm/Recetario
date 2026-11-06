import { useState } from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

const ADD_RECIPE = gql`
  mutation AddRecipe(
    $title: String!
    $description: String
    $countryOfOrigin: String!
    $ingredients: [String]!
    $instructions: [String]
    $prepTime: Int
  ) {
    addRecipe(
      title: $title
      description: $description
      countryOfOrigin: $countryOfOrigin
      ingredients: $ingredients
      instructions: $instructions
      prepTime: $prepTime
    ) {
      _id
      title
    }
  }
`

function AddRecipe() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [countryOfOrigin, setCountryOfOrigin] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [prepTime, setPrepTime] = useState('')

  const [addRecipe, { loading, error }] = useMutation(ADD_RECIPE, {
    refetchQueries: ['GetRecipes'],
  })

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await addRecipe({
        variables: {
          title,
          description,
          countryOfOrigin,

          ingredients: ingredients.split(',').map((item) => item.trim()).filter(Boolean),
        
          instructions: instructions.split('\n').map((step) => step.trim()).filter(Boolean),
          prepTime: prepTime ? Number(prepTime) : null,
        },
      })
    
      setTitle('')
      setDescription('')
      setCountryOfOrigin('')
      setIngredients('')
      setInstructions('')
      setPrepTime('')
    } catch {
     
    }
  }

  return (
    <div>
      <h2>Add a recipe</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Country of origin" value={countryOfOrigin} onChange={(e) => setCountryOfOrigin(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input placeholder="Ingredients, separated by commas" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <textarea placeholder="Instructions, one step per line" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        <input type="number" placeholder="Prep time (minutes)" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} />
        <button type="submit" disabled={loading}>Post recipe</button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  )
}

export default AddRecipe