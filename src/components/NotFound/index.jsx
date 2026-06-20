import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-card">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-heading">Page Not Found</h2>
      <p className="not-found-text">
        404 - Page Not Found
      </p>
      <Link to="/" className="back-dashboard-btn">
        Back to dashboard
      </Link>
    </div>
  </div>
)

export default NotFound
