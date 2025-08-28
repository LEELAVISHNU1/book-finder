import axios from 'axios';

const BASE_URL = 'https://openlibrary.org/search.json';

export const searchBooks = async (query, searchType = 'title', filters = {}, page = 1, limit = 20) => {
  try {
    let url = `${BASE_URL}?${searchType}=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;
    
    const response = await axios.get(url);
    let books = response.data.docs || [];
    
    // Apply filters on the client side since Open Library API has limited filtering options
    if (filters.language) {
      books = books.filter(book => 
        book.language && book.language.includes(filters.language)
      );
    }
    
    if (filters.year) {
      books = books.filter(book => 
        book.first_publish_year === parseInt(filters.year)
      );
    }
    
    // Apply sorting
    if (filters.sort === 'newest') {
      books.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    } else if (filters.sort === 'oldest') {
      books.sort((a, b) => (a.first_publish_year || Infinity) - (b.first_publish_year || Infinity));
    }
    
    return {
      ...response.data,
      docs: books
    };
  } catch (error) {
    throw new Error('Failed to fetch books. Please try again later.');
  }
};

export const getFeaturedBooks = async () => {
  try {
    // Get popular books from various categories
    const responses = await Promise.all([
      axios.get(`${BASE_URL}?subject=bestsellers&limit=6`),
      axios.get(`${BASE_URL}?subject=classics&limit=3`),
      axios.get(`${BASE_URL}?subject=science+fiction&limit=3`)
    ]);
    
    // Combine and remove duplicates
    const allBooks = responses.flatMap(response => response.data.docs || []);
    const uniqueBooks = allBooks.filter((book, index, self) =>
      index === self.findIndex(b => b.key === book.key)
    );
    
    return uniqueBooks.slice(0, 12);
  } catch (error) {
    console.error('Error fetching featured books:', error);
    // Return some fallback data if API fails
    return [
      {
        key: '/works/OL82592W',
        title: 'The Great Gatsby',
        author_name: ['F. Scott Fitzgerald'],
        first_publish_year: 1925,
        cover_i: 2978076
      },
      {
        key: '/works/OL27448W',
        title: 'To Kill a Mockingbird',
        author_name: ['Harper Lee'],
        first_publish_year: 1960,
        cover_i: 905715
      }
    ];
  }
};