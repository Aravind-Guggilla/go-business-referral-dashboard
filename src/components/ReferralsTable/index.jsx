import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'

const ReferralsTable = ({referrals}) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)

  // Reset page when referrals list changes
  useEffect(() => {
    setCurrentPage(1)
  }, [referrals])

  const totalEntries = referrals.length
  const itemsPerPage = 10
  const totalPages = Math.ceil(totalEntries / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentReferrals = referrals.slice(startIndex, startIndex + itemsPerPage)

  const fromEntry = totalEntries > 0 ? startIndex + 1 : 0
  const toEntry = Math.min(currentPage * itemsPerPage, totalEntries)

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

  const onClickPageNumber = pageNum => {
    setCurrentPage(pageNum)
  }

  const onClickPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const onClickNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const renderPageNumbers = () => {
    const pages = []
    const limit = Math.max(1, totalPages)
    for (let i = 1; i <= limit; i++) {
      pages.push(
        <button
          key={i}
          type="button"
          className={`page-num-btn ${currentPage === i ? 'active' : ''}`}
          onClick={() => onClickPageNumber(i)}
        >
          {i}
        </button>
      )
    }
    return pages
  }

  const handleRowClick = id => {
    navigate(`/referral/${id}`)
  }

  return (
    <div className="table-wrapper">
      <h2 className="table-title">All referrals</h2>
      <div className="table-responsive">
        <table className="referrals-table-element">
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Date</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {totalEntries === 0 ? (
              <tr>
                <td colSpan="4" className="empty-state-cell">
                  No matching entries
                </td>
              </tr>
            ) : (
              currentReferrals.map(referral => (
                <tr
                  key={referral.id}
                  className="referral-row"
                  onClick={() => handleRowClick(referral.id)}
                >
                  <td className="name-cell">{referral.name}</td>
                  <td>{referral.serviceName}</td>
                  <td>{formatDate(referral.date)}</td>
                  <td className="profit-cell">{formatProfit(referral.profit)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer-controls">
        <span className="entries-info">
          Showing {fromEntry}–{toEntry} of {totalEntries} entries
        </span>
        
        {totalEntries > 0 && (
          <div className="pagination-buttons">
            <button
              type="button"
              className="prev-next-btn"
              onClick={onClickPrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {renderPageNumbers()}
            <button
              type="button"
              className="prev-next-btn"
              onClick={onClickNext}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReferralsTable
