import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/client'

export default function Login() {
  const [username, setUsername] = useState('root')
  const [password, setPassword] = useState('root')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const { token } = await login(username, password)
      localStorage.setItem('token', token)
      navigate('/')
    } catch {
      setError('invalid credentials')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="text"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
          <input
            className="login-input"
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div className="login-error">{error}</div>}
          <button className="login-btn" type="submit">connect</button>
        </form>
      </div>
    </div>
  )
}
