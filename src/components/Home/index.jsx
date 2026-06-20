import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import { 
  DollarSign, 
  CreditCard, 
  Link as LinkIcon, 
  Hourglass, 
  Percent, 
  Briefcase, 
  Users, 
  ArrowLeftRight 
} from 'lucide-react'
import Header from '../Header'
import Footer from '../Footer'
import Loader from '../Loader'
import Filters from '../Filters'
import ReferralsTable from '../ReferralsTable'
import './index.css'

const Home = () => {
  const [metrics, setMetrics] = useState([])
  const [serviceSummary, setServiceSummary] = useState({})
  const [referralInfo, setReferralInfo] = useState({})
  const [referrals, setReferrals] = useState([])
  
  const [searchText, setSearchText] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [sortBy, setSortBy] = useState('desc')
  
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isTableLoading, setIsTableLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Debounce search text
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText)
    }, 300)
    return () => clearTimeout(handler)
  }, [searchText])

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isInitialLoading) {
        setIsTableLoading(true)
      }
      setIsError(false)
      setErrorMessage('')
      
      const token = Cookies.get('jwt_token')
      const params = new URLSearchParams()
      if (debouncedSearch) {
        params.append('search', debouncedSearch)
      }
      if (sortBy) {
        params.append('sort', sortBy)
      }

      const url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?${params.toString()}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      try {
        const response = await fetch(url, options)
        const data = await response.json()
        
        if (response.ok && data.success) {
          const rootData = data.data || data
          setMetrics(rootData.metrics || [])
          setServiceSummary(rootData.serviceSummary || {})
          setReferralInfo(rootData.referral || {})
          setReferrals(rootData.referrals || [])
        } else {
          setIsError(true)
          setErrorMessage(data.message || `Failed to load dashboard data (Status: ${response.status})`)
        }
      } catch (error) {
        setIsError(true)
        setErrorMessage(error.message || 'Network error occurred')
      } finally {
        setIsInitialLoading(false)
        setIsTableLoading(false)
      }
    }

    fetchDashboardData()
  }, [debouncedSearch, sortBy])

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
  }

  const getMetricIcon = (label) => {
    const normLabel = (label || '').toLowerCase()
    if (normLabel.includes('balance')) {
      return <DollarSign className="metric-icon-svg" />
    }
    if (normLabel.includes('discount percentage') || normLabel.includes('percent')) {
      return <CreditCard className="metric-icon-svg" />
    }
    if (normLabel.includes('referral') && !normLabel.includes('discount')) {
      return <LinkIcon className="metric-icon-svg" />
    }
    if (normLabel.includes('discount amount')) {
      return <Hourglass className="metric-icon-svg" />
    }
    if (normLabel.includes('commission amount')) {
      return <Percent className="metric-icon-svg" />
    }
    if (normLabel.includes('earning')) {
      return <Briefcase className="metric-icon-svg" />
    }
    if (normLabel.includes('commission discount')) {
      return <Users className="metric-icon-svg" />
    }
    if (normLabel.includes('bank transfer')) {
      return <ArrowLeftRight className="metric-icon-svg" />
    }
    return <DollarSign className="metric-icon-svg" />
  }

  return (
    <div className="dashboard-page-wrapper">
      <Header />
      
      <main className="dashboard-main-content">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Referral Dashboard</h1>
          <p className="dashboard-subtitle">Track your referrals, earnings, and partner activity in one place.</p>
        </header>

        {isError && (
          <div className="error-alert-box" role="alert">
            <span className="error-alert-title">Error Loading Data</span>
            <p className="error-alert-desc">{errorMessage}</p>
          </div>
        )}

        {isInitialLoading ? (
          <Loader />
        ) : (
          <>
            {/* Overview Section */}
            <section aria-label="Overview metrics" role="region" className="overview-section">
              <h2 className="overview-title">Overview</h2>
              <div className="metrics-grid">
                {metrics.map(metric => (
                  <div key={metric.id} className="metric-card">
                    <div className="metric-icon-container">
                      {getMetricIcon(metric.label)}
                    </div>
                    <div className="metric-details">
                      <span className="metric-value">{metric.value}</span>
                      <span className="metric-label">{metric.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Service Summary Section */}
            <section aria-label="Service summary" className="service-summary-section">
              <h2 className="service-summary-title">Service summary</h2>
              <div className="service-summary-card">
                <div className="summary-table-wrapper">
                  <table className="summary-table">
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Your Referrals</th>
                        <th>Active Referrals</th>
                        <th>Total Ref. Earnings</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="summary-service-name">{serviceSummary.service || '-'}</td>
                        <td>{serviceSummary.yourReferrals || '0'}</td>
                        <td>{serviceSummary.activeReferrals || '0'}</td>
                        <td className="summary-earnings-value">{serviceSummary.totalRefEarnings || '$0'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Share Referral Section */}
            <section aria-label="Share referral" className="share-referral-section">
              <div className="share-referral-card">
                <h2 className="share-referral-title">Refer friends and earn more</h2>
                <div className="share-fields-grid">
                  <div className="share-field-group">
                    <span className="share-field-label">YOUR REFERRAL LINK</span>
                    <div className="share-input-row">
                      <input
                        type="text"
                        className="share-read-only-input"
                        value={referralInfo.link || ''}
                        readOnly
                      />
                      <button
                        type="button"
                        className="share-copy-btn"
                        onClick={() => handleCopy(referralInfo.link)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="share-field-group">
                    <span className="share-field-label">YOUR REFERRAL CODE</span>
                    <div className="share-input-row">
                      <input
                        type="text"
                        className="share-read-only-input"
                        value={referralInfo.code || ''}
                        readOnly
                      />
                      <button
                        type="button"
                        className="share-copy-btn"
                        onClick={() => handleCopy(referralInfo.code)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* All Referrals Section */}
            <section className="all-referrals-section">
              <Filters 
                searchText={searchText} 
                onSearchChange={setSearchText} 
                sortBy={sortBy} 
                onSortChange={setSortBy} 
              />
              <div className={`table-container-outer ${isTableLoading ? 'table-loading-fade' : ''}`}>
                <ReferralsTable referrals={referrals} />
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Home
