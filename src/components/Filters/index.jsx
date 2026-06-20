import './index.css'

const Filters = ({searchText, onSearchChange, sortBy, onSortChange}) => {
  return (
    <div className="filters-container">
      <div className="search-group">
        <span className="search-label-text">Search</span>
        <div className="search-input-wrapper">
          <input
            id="search-input"
            type="text"
            className="search-input"
            placeholder="Name or service…"
            value={searchText}
            onChange={e => onSearchChange(e.target.value)}
            aria-label="Search referrals"
          />
          {searchText && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="sort-group">
        <label className="sort-label">
          Sort by date
          <select
            className="sort-select"
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </label>
      </div>
    </div>
  )
}

export default Filters
