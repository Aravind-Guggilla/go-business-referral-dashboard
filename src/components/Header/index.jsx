import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <header className="header-container">
      <Link to="/" className="header-brand-logo">
        Go Business
      </Link>
      <nav  className="header-nav-container">
        <Link to="/" className="header-nav-link">Home</Link>
      </nav>
      <div className="header-actions">
        <button type="button" className="try-free-btn">
          Try for free
        </button>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Log out
        </button>
      </div>
    </header>
  )
}

export default Header
