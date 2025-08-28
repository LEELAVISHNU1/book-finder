import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    language: '',
    year: '',
    sort: 'relevance'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, searchType, filters);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    
    // If we already have a search query, apply filters immediately
    if (query.trim()) {
      onSearch(query, searchType, newFilters);
    }
  };

  const clearFilters = () => {
    const newFilters = {
      language: '',
      year: '',
      sort: 'relevance'
    };
    setFilters(newFilters);
    
    // If we already have a search query, re-search with cleared filters
    if (query.trim()) {
      onSearch(query, searchType, newFilters);
    }
  };

  const languages = [
    { value: '', label: 'Any Language' },
    { value: 'eng', label: 'English' },
    { value: 'spa', label: 'Spanish' },
    { value: 'fre', label: 'French' },
    { value: 'ger', label: 'German' },
    { value: 'ita', label: 'Italian' }
  ];

  return (
    <section className="search-section" id="search-section">
      <div className="container">
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="search-main">
            <div className="search-input-container">
              <div className="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search books by ${searchType}...`}
                disabled={isLoading}
                className="search-input"
              />
              <button 
                type="button" 
                className="filter-toggle"
                onClick={() => setFiltersOpen(!filtersOpen)}
                aria-label="Toggle filters"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z" clipRule="evenodd" />
                </svg>
                Filters
                {(filters.language || filters.year || filters.sort !== 'relevance') && (
                  <span className="filter-indicator"></span>
                )}
              </button>
              <button 
                type="submit" 
                disabled={isLoading || !query.trim()}
                className="search-button"
              >
                {isLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            
            <div className="search-type-selector">
              <div className="type-options">
                <button
                  type="button"
                  className={searchType === 'title' ? 'active' : ''}
                  onClick={() => setSearchType('title')}
                >
                  Title
                </button>
                <button
                  type="button"
                  className={searchType === 'author' ? 'active' : ''}
                  onClick={() => setSearchType('author')}
                >
                  Author
                </button>
                <button
                  type="button"
                  className={searchType === 'subject' ? 'active' : ''}
                  onClick={() => setSearchType('subject')}
                >
                  Subject
                </button>
              </div>
            </div>
          </div>
          
          <div className={`search-filters ${filtersOpen ? 'open' : ''}`}>
            <div className="filters-header">
              <h3>Refine Your Search</h3>
              <button type="button" onClick={clearFilters} className="clear-filters">
                Clear All
              </button>
            </div>
            
            <div className="filter-grid">
              <div className="filter-group">
                <label>Language</label>
                <select
                  value={filters.language}
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                >
                  {languages.map(lang => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label>Publication Year</label>
                <input
                  type="number"
                  placeholder="e.g., 2020"
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  min="1800"
                  max={new Date().getFullYear()}
                />
              </div>
              
              <div className="filter-group">
                <label>Sort By</label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchForm;