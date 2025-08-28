import React from 'react';
import BookCard from './BookCard';
import './FeaturedBooks.css';

const FeaturedBooks = ({ books, onBookSelect }) => {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <section className="featured-books" id='featured-books'>
      <div className="container">
        <div className="featured-header">
          <h2>Featured Books</h2>
          <p>Discover our curated selection of popular titles</p>
        </div>
        <div className="books-grid">
          {books.map((book) => (
            <BookCard 
              key={book.key} 
              book={book} 
              onClick={() => onBookSelect(book.title, 'title')}
            />
          ))}
        </div>
        <div className="featured-footer">
          <p>Search for more books using the search bar above</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;