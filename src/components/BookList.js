import React from 'react';
import BookCard from './BookCard';
import './BookList.css';

const BookList = ({ books, query, onClearSearch }) => {
  if (!books || books.length === 0) {
    return (
      <section className="book-list">
        <div className="container">
          <div className="search-results-header">
            <h2>No books found for "{query}"</h2>
            <button className="clear-search-btn" onClick={onClearSearch}>
              Back to Featured Books
            </button>
          </div>
          <div className="no-books">
            <p>Try a different search term or browse our featured collection</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="book-list">
      <div className="container">
        <div className="search-results-header">
          <h2>Search Results for "{query}"</h2>
          <button className="clear-search-btn" onClick={onClearSearch}>
            Clear Search
          </button>
        </div>
        <div className="books-grid">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
        <div className="results-count">
          <p>Found {books.length} results</p>
        </div>
      </div>
    </section>
  );
};

export default BookList;