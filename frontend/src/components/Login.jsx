import { useState } from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { loading: loginLoading, error: loginError }] = useMutation(LOGIN)
  const [register, { loading: registerLoading, error: registerError }] = useMutation(REGISTER)

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      let token
      if (isRegistering) {
        const { data } = await register({ variables: { username, email, password } })
        token = data.register
      } else {
        const { data } = await login({ variables: { username, password } })
        token = data.login
      }
      localStorage.setItem('token', token)
      onLogin()
    } catch {
      // the error message is shown below the form
    }
  }

  const error = isRegistering ? registerError : loginError
  const loading = isRegistering ? registerLoading : loginLoading

  return (
    <div>
      <h2>{isRegistering ? 'Create an account' : 'Log in'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {isRegistering && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {isRegistering ? 'Register' : 'Log in'}
        </button>
      </form>
      {error && <p>{error.message}</p>}
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Have an account? Log in' : 'New here? Register'}
      </button>
    </div>
  )
}

export default Login