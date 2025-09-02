import api from './api';

const bookService = {
  async getBooks(page = 1, limit = 10, search = '') {
    const response = await api.get('/books', { 
      params: { page, limit, search } 
    });
    return response.data;
  },

  async getBookById(id) {
    const response = await api.get(`/books/${id}`);
    return response.data.book;
  },

  async searchBooks(query) {
    const response = await api.get('/books/search', { 
      params: { query } 
    });
    return response.data.books;
  }
};

export default bookService;
