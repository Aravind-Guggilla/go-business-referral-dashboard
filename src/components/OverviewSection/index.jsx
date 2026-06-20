import Metrics from "./components/Metrics"
import "./index.css"


const OverviewSection = (metrics) => {
    return (  
    <section aria-label="Overview metrics" role="region" className="overview-section">
        <h2 className="overview-title">Overview</h2>
        <div className="metrics-grid">
               {metrics.map((metric) => (
                   <Metrics key={metric.id} data={metric} />
               ))}
        </div>
    </section>
    )
}

export default OverviewSection