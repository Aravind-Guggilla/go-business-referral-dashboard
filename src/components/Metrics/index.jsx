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


const Metrics = (data) => {
  console.log(data)
    const { id, label, value} = data
    return (
        <div key={id} className="metric-card">
            <div className="metric-icon-container">
                {getMetricIcon(label)}
            </div>
            <div className="metric-details">
                <span className="metric-value">{value}</span>
                <span className="metric-label">{label}</span>
            </div>
        </div>
    )
}

export default Metrics