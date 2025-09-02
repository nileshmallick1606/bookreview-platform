const BaseRepository = require('./baseRepository');

/**
 * Repository for user data
 */
class UserRepository extends BaseRepository {
  constructor() {
    super('users.json');
  }

  /**
   * Find a user by email
   */
  async findByEmail(email) {
    const users = await this.readData();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  /**
   * Create a new user with secure password handling
   */
  async createUser(userData) {
    // Password hashing should be done in the service layer before calling this method
    return await this.create(userData);
  }

  /**
   * Add a book to a user's favorites
   */
  async addFavorite(userId, bookId) {
    const user = await this.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Initialize favorites array if it doesn't exist
    if (!user.favorites) {
      user.favorites = [];
    }
    
    // Check if already in favorites
    if (!user.favorites.includes(bookId)) {
      user.favorites.push(bookId);
      await this.update(userId, { favorites: user.favorites });
    }
    
    return user;
  }

  /**
   * Remove a book from a user's favorites
   */
  async removeFavorite(userId, bookId) {
    const user = await this.findById(userId);
    
    if (!user || !user.favorites) {
      throw new Error('User not found or no favorites');
    }
    
    // Filter out the bookId
    user.favorites = user.favorites.filter(id => id !== bookId);
    await this.update(userId, { favorites: user.favorites });
    
    return user;
  }
}

module.exports = new UserRepository();
