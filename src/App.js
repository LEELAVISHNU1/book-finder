import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import BookList from './components/BookList';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import FeaturedBooks from './components/FeaturedBooks';
import { searchBooks, getFeaturedBooks } from './services/api';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [featuredBooks, setFeaturedBooks] = useState([]);

  // Load featured books on initial render
  useEffect(() => {
    const loadFeaturedBooks = async () => {
      setIsLoading(true);
      try {
        const featured = await getFeaturedBooks();
        setFeaturedBooks(featured);
      } catch (err) {
        console.error('Failed to load featured books:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedBooks();
  }, []);

  const handleSearch = async (searchQuery, searchType) => {
    setIsLoading(true);
    setError(null);
    setQuery(searchQuery);
    setHasSearched(true);
    
    try {
      const data = await searchBooks(searchQuery, searchType);
      setBooks(data.docs || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (query) {
      handleSearch(query, 'title');
    }
  };

  const clearSearch = () => {
    setBooks([]);
    setQuery('');
    setHasSearched(false);
    setError(null);
  };

  return (
    <div className="App">
      <Header />
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      
      {isLoading && <Loading />}
      
      {error && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}
      
      {hasSearched ? (
        <BookList books={books} query={query} onClearSearch={clearSearch} />
      ) : (
        <FeaturedBooks books={featuredBooks} onBookSelect={handleSearch} />
      )}
    </div>
  );
}

export default App;
