import "/index.css"

const ServiceSummary = (serviceSummary) => {
    return (
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
    )
}

export default ServiceSummary