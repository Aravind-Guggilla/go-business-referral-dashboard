import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-content">
      <span className="footer-brand">Go Business</span>
      <nav aria-label="Footer" className="footer-nav">
        <a href="#about" className="footer-link">About</a>
        <a href="#contact" className="footer-link">Contact</a>
        <a href="#privacy" className="footer-link">Privacy</a>
        <a href="#terms" className="footer-link">Terms</a>
      </nav>
      <span className="footer-copyright">© 2024 Go Business, Inc.</span>
    </div>
  </footer>
)

export default Footer
