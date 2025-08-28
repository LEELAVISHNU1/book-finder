import React from 'react';
import './BookCard.css';

const BookCard = ({ book, onClick }) => {
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : '/placeholder-book-cover.png';

  const authorName = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
  const publishYear = book.first_publish_year || 'Unknown Year';
  const editionCount = book.edition_count ? `${book.edition_count} edition(s)` : '';

  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-cover">
        <img src={coverUrl} alt={`Cover of ${book.title}`} />
        {!book.cover_i && <div className="cover-placeholder">No Cover Available</div>}
      </div>
      <div className="book-details">
        <h3>{book.title}</h3>
        <p className="book-author">By {authorName}</p>
        <p className="book-year">Published: {publishYear}</p>
        <p className="book-editions">{editionCount}</p>
        {book.subject && (
          <div className="book-tags">
            {book.subject.slice(0, 3).map((subject, index) => (
              <span key={index} className="book-tag">{subject}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;