import {useState} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const token = Cookies.get('jwt_token')
  if (token) {
    return <Navigate to="/" replace />
  }

  const onChangeEmail = event => {
    setEmail(event.target.value)
    setErrorMessage('')
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
    setErrorMessage('')
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/', {replace: true})
  }

  const onSubmitFailure = errorMsg => {
    setErrorMessage(errorMsg)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    const userDetails = {email, password}
    const url = 'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (data.success && data.data.token) {
        onSubmitSuccess(data.data.token)
      } else {
        onSubmitFailure(data.message || 'Invalid email or password')
      }
    } catch (error) {
      setErrorMessage(error.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-card-container">
        <h1 className="login-brand-title">Go Business</h1>
        <p className="login-tagline">Sign in to open your referral dashboard.</p>
        
        <form className="login-form-element" onSubmit={onSubmitForm}>
          <div className="login-input-group">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="login-input"
              placeholder="you@example.com"
              value={email}
              onChange={onChangeEmail}
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="login-input"
              placeholder="••••••••••"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
          
          {errorMessage && (
            <p className="login-error-message" role="alert">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
