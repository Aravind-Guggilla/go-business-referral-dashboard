import './index.css'

const Loader = ({message = "Loading dashboard..."}) => (
  <div className="loader-container">
    <div className="spinner"></div>
    <p className="loader-text">{message}</p>
  </div>
)

export default Loader
