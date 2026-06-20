import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import Loader from '../Loader'
import './index.css'

const ReferralDetails = () => {
  const {id} = useParams()
  const [referral, setReferral] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchReferralDetails = async () => {
      setIsLoading(true)
      setIsError(false)
      const token = Cookies.get('jwt_token')
      const url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?id=${id}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      try {
        const response = await fetch(url, options)
        const data = await response.json()
        // console.log(data.data.referrals[0]);
        
        if (response.ok && data.success) {
          const referralData = data.data.referrals[0]
          setReferral(referralData)
        } else {
          setIsError(true)
        }
      } catch (error) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReferralDetails()
  }, [id])

  const formatDate = dateString => {
    if (!dateString) return ''
    return dateString.replace(/-/g, '/')
  }

  const formatProfit = profit => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(profit)
  }

  const renderContent = () => {
    if (isLoading) {
      return <Loader message="Loading referral details..." />
    }

    if (isError || !referral) {
      return (
        <div className="error-view-container">
          <h1 className="error-title">Referral not found</h1>
          <Link to="/" className="back-link">
            ← Back to dashboard
          </Link>
        </div>
      )
    }

    return (
      <div className="details-card-container">
        <Link to="/" className="back-link">
          ← Back to dashboard
        </Link>
        
        <div className="details-header-section">
          <h1 className="details-main-title">Referral Details</h1>
          <p className="details-sub-title">Full information for this referral partner.</p>
        </div>

        <div className="details-card">
          <div className="card-header">
            <h2 className="partner-name">{referral.name}</h2>
            <span className="service-badge">{referral.serviceName}</span>
          </div>
          
          <div className="card-divider"></div>
          
          <dl className="details-list">
            <div className="detail-item">
              <dt className="detail-label">Referral ID</dt>
              <dd className="detail-value">{referral.id}</dd>
            </div>
            
            <div className="detail-item">
              <dt className="detail-label">NAME</dt>
              <dd className="detail-value">{referral.name}</dd>
            </div>
            
            <div className="detail-item">
              <dt className="detail-label">Service Name</dt>
              <dd className="detail-value">{referral.serviceName}</dd>
            </div>
            
            <div className="detail-item">
              <dt className="detail-label">DATE</dt>
              <dd className="detail-value">{formatDate(referral.date)}</dd>
            </div>
            
            <div className="detail-item">
              <dt className="detail-label">PROFIT</dt>
              <dd className="detail-value profit-highlight">
                {formatProfit(referral.profit)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content-area">{renderContent()}</main>
      <Footer />
    </div>
  )
}

export default ReferralDetails
