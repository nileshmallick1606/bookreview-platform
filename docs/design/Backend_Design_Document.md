# Backend Design Document: BookReview Platform

**Document Version:** 1.0  
**Date:** September 2, 2025  
**Author:** Internal Assignment Team  

## 1. Introduction

This document describes the detailed design of the Backend application for the BookReview Platform. The backend will be built using Express.js on Node.js and will provide RESTful API services to support the frontend application, including user authentication, book management, review handling, and AI-powered recommendations.

## 2. Architecture Overview

### 2.1 High-Level Architecture

The backend follows a layered architecture using Express.js. The application is organized into the following layers:

1. **API Layer:** Express routes and controllers
2. **Service Layer:** Business logic implementation
3. **Data Access Layer:** File-based data storage operations
4. **External Services Layer:** Integration with OpenAI API

### 2.2 Design Patterns

- **MVC Pattern:** Model-View-Controller pattern (without View, as it's an API)
- **Repository Pattern:** Abstraction for data access operations
- **Service Layer Pattern:** Encapsulation of business logic
- **Middleware Pattern:** For request processing, authentication, validation, etc.

## 3. Application Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── index.js               # Configuration exports
│   │   ├── env.js                 # Environment variables
│   │   └── logger.js              # Logging configuration
│   ├── controllers/
│   │   ├── authController.js      # Authentication endpoints
│   │   ├── bookController.js      # Book-related endpoints
│   │   ├── reviewController.js    # Review-related endpoints
│   │   ├── userController.js      # User profile endpoints
│   │   └── recommendationController.js # Recommendation endpoints
│   ├── middleware/
│   │   ├── auth.js                # Authentication middleware
│   │   ├── validation.js          # Request validation middleware
│   │   ├── errorHandler.js        # Error handling middleware
│   │   └── rateLimiter.js         # API rate limiting
│   ├── models/
│   │   ├── userModel.js           # User data model
│   │   ├── bookModel.js           # Book data model
│   │   └── reviewModel.js         # Review data model
│   ├── repositories/
│   │   ├── baseRepository.js      # Base repository with common operations
│   │   ├── userRepository.js      # User data operations
│   │   ├── bookRepository.js      # Book data operations
│   │   └── reviewRepository.js    # Review data operations
│   ├── routes/
│   │   ├── index.js               # Route aggregation
│   │   ├── authRoutes.js          # Authentication routes
│   │   ├── bookRoutes.js          # Book-related routes
│   │   ├── reviewRoutes.js        # Review-related routes
│   │   ├── userRoutes.js          # User profile routes
│   │   └── recommendationRoutes.js # Recommendation routes
│   ├── services/
│   │   ├── authService.js         # Authentication business logic
│   │   ├── bookService.js         # Book-related business logic
│   │   ├── reviewService.js       # Review-related business logic
│   │   ├── userService.js         # User profile business logic
│   │   └── recommendationService.js # Recommendation logic with OpenAI
│   ├── utils/
│   │   ├── asyncHandler.js        # Async error handling utility
│   │   ├── apiResponse.js         # Standardized API responses
│   │   ├── validators.js          # Input validation functions
│   │   └── fileUtils.js           # File operations utilities
│   └── app.js                     # Main application entry point
├── data/
│   ├── users.json                 # User data store
│   ├── books.json                 # Book data store
│   └── reviews.json               # Review data store
├── tests/
│   ├── unit/                      # Unit tests
│   ├── integration/               # Integration tests
│   └── fixtures/                  # Test fixtures
└── package.json
```

## 4. API Design

### 4.1 RESTful API Design Principles

- Resource-oriented design
- Consistent URL patterns
- Standard HTTP methods (GET, POST, PUT, DELETE)
- Appropriate status codes
- Pagination for list endpoints
- Query parameters for filtering and search
- Comprehensive error responses

### 4.2 API Endpoints

#### Authentication Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | /api/auth/register | Register a new user | `{ email, password, name }` | `{ user, token }` |
| POST | /api/auth/login | User login | `{ email, password }` | `{ user, token }` |
| GET | /api/auth/me | Get current user | - | `{ user }` |

#### Book Endpoints

| Method | Endpoint | Description | Request Body/Params | Response |
|--------|----------|-------------|--------------|----------|
| GET | /api/books | List books (paginated) | Query: `page`, `limit`, `search` | `{ books, totalCount, page, pageSize }` |
| GET | /api/books/search | Search books | Query: `query` | `{ books }` |
| GET | /api/books/:id | Get book details | - | `{ book }` |

#### Review Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | /api/books/:bookId/reviews | Get reviews for a book | Query: `page`, `limit` | `{ reviews, totalCount }` |
| POST | /api/books/:bookId/reviews | Create a review | `{ text, rating }` | `{ review }` |
| PUT | /api/reviews/:id | Update a review | `{ text, rating }` | `{ review }` |
| DELETE | /api/reviews/:id | Delete a review | - | `{ success: true }` |

#### User Profile Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | /api/users/:id | Get user profile | - | `{ user }` |
| PUT | /api/users/:id | Update user profile | `{ name, ... }` | `{ user }` |
| GET | /api/users/:id/reviews | Get reviews by user | Query: `page`, `limit` | `{ reviews, totalCount }` |
| POST | /api/users/favorites/:bookId | Add a favorite book | - | `{ success: true }` |
| DELETE | /api/users/favorites/:bookId | Remove a favorite book | - | `{ success: true }` |

#### Recommendation Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | /api/recommendations | Get personalized recommendations | Query: `limit` | `{ recommendations }` |

### 4.3 Response Format

Standard response format for all API endpoints:

**Success Response:**
```json
{
  "status": "success",
  "data": {
    // Response data specific to the endpoint
  },
  "meta": {
    // Meta information like pagination details (if applicable)
  }
}
```

**Error Response:**
```json
{
  "status": "error",
  "error": {
    "code": 400, // HTTP status code
    "message": "Error message",
    "details": [
      // Optional additional error details
    ]
  }
}
```

## 5. Authentication System

### 5.1 JWT Implementation

- JWT generation using `jsonwebtoken` library
- Token structure with user ID and role claims
- Token expiration set to 60 minutes
- Secret key stored in environment variables
- HMAC SHA256 algorithm (HS256) for token signing

### 5.2 Authentication Flow

1. User provides credentials (email/password)
2. Backend validates credentials
3. If valid, JWT token is generated and returned
4. Frontend stores token and sends with subsequent requests
5. Backend validates token in middleware

### 5.3 Authentication Middleware

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const ApiResponse = require('../utils/apiResponse');
const userRepository = require('../repositories/userRepository');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return ApiResponse.unauthorized(res, 'Authentication required');
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user
    const user = await userRepository.findById(decoded.userId);
    
    if (!user) {
      return ApiResponse.unauthorized(res, 'User not found');
    }
    
    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return ApiResponse.unauthorized(res, 'Invalid token');
  }
};

module.exports = authMiddleware;
```

## 6. Data Storage Design

### 6.1 File-Based Storage Implementation

The application will use structured JSON files for data storage with the following approach:

- Each entity type has its own JSON file
- Files are read into memory at startup
- In-memory caching for performance
- File locking for concurrent write operations
- Periodic file syncing for data persistence

### 6.2 Base Repository Implementation

```javascript
// repositories/baseRepository.js
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class BaseRepository {
  constructor(fileName) {
    this.filePath = path.join(__dirname, '../../data', fileName);
    this.data = [];
    this.loaded = false;
  }
  
  async load() {
    if (this.loaded) return;
    
    try {
      const fileExists = await fs.access(this.filePath)
        .then(() => true)
        .catch(() => false);
      
      if (fileExists) {
        const content = await fs.readFile(this.filePath, 'utf8');
        this.data = JSON.parse(content);
      } else {
        // Create empty file
        await this.save();
      }
      
      this.loaded = true;
    } catch (error) {
      throw new Error(`Failed to load data: ${error.message}`);
    }
  }
  
  async save() {
    try {
      const content = JSON.stringify(this.data, null, 2);
      await fs.writeFile(this.filePath, content, 'utf8');
    } catch (error) {
      throw new Error(`Failed to save data: ${error.message}`);
    }
  }
  
  async findAll() {
    await this.load();
    return [...this.data];
  }
  
  async findById(id) {
    await this.load();
    return this.data.find(item => item.id === id) || null;
  }
  
  async create(item) {
    await this.load();
    
    const newItem = {
      ...item,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.data.push(newItem);
    await this.save();
    
    return newItem;
  }
  
  async update(id, updates) {
    await this.load();
    
    const index = this.data.findIndex(item => item.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const updatedItem = {
      ...this.data[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.data[index] = updatedItem;
    await this.save();
    
    return updatedItem;
  }
  
  async delete(id) {
    await this.load();
    
    const index = this.data.findIndex(item => item.id === id);
    
    if (index === -1) {
      return false;
    }
    
    this.data.splice(index, 1);
    await this.save();
    
    return true;
  }
  
  async query(filterFn) {
    await this.load();
    return this.data.filter(filterFn);
  }
}

module.exports = BaseRepository;
```

### 6.3 Entity-Specific Repositories

```javascript
// repositories/userRepository.js
const BaseRepository = require('./baseRepository');
const bcrypt = require('bcrypt');

class UserRepository extends BaseRepository {
  constructor() {
    super('users.json');
  }
  
  async findByEmail(email) {
    await this.load();
    return this.data.find(user => user.email === email) || null;
  }
  
  async create(userData) {
    // Hash password before storage
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    return super.create({
      ...userData,
      password: hashedPassword,
      favorites: []
    });
  }
  
  async addFavorite(userId, bookId) {
    const user = await this.findById(userId);
    
    if (!user) {
      return null;
    }
    
    if (!user.favorites) {
      user.favorites = [];
    }
    
    if (!user.favorites.includes(bookId)) {
      user.favorites.push(bookId);
      return await this.update(userId, { favorites: user.favorites });
    }
    
    return user;
  }
  
  async removeFavorite(userId, bookId) {
    const user = await this.findById(userId);
    
    if (!user || !user.favorites) {
      return null;
    }
    
    user.favorites = user.favorites.filter(id => id !== bookId);
    return await this.update(userId, { favorites: user.favorites });
  }
}

module.exports = new UserRepository();
```

## 7. Service Layer Design

The service layer implements business logic and acts as a mediator between controllers and repositories.

### 7.1 Authentication Service

```javascript
// services/authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET, JWT_EXPIRY } = require('../config/env');
const userRepository = require('../repositories/userRepository');

class AuthService {
  async register(userData) {
    // Check if user exists
    const existingUser = await userRepository.findByEmail(userData.email);
    
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    // Create user
    const user = await userRepository.create(userData);
    
    // Generate JWT token
    const token = this.generateToken(user);
    
    // Return user (without password) and token
    const { password, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token
    };
  }
  
  async login(email, password) {
    // Find user
    const user = await userRepository.findByEmail(email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    
    // Generate JWT token
    const token = this.generateToken(user);
    
    // Return user (without password) and token
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token
    };
  }
  
  generateToken(user) {
    return jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );
  }
  
  async getCurrentUser(userId) {
    const user = await userRepository.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = new AuthService();
```

### 7.2 Recommendation Service with OpenAI Integration

```javascript
// services/recommendationService.js
const { Configuration, OpenAIApi } = require('openai');
const { OPENAI_API_KEY } = require('../config/env');
const userRepository = require('../repositories/userRepository');
const bookRepository = require('../repositories/bookRepository');
const reviewRepository = require('../repositories/reviewRepository');

class RecommendationService {
  constructor() {
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY
    });
    
    this.openai = new OpenAIApi(configuration);
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
    this.recommendationCache = new Map();
  }
  
  async getRecommendations(userId, limit = 5) {
    // Check cache first
    const cacheKey = `${userId}-${limit}`;
    const cachedRecommendations = this.recommendationCache.get(cacheKey);
    
    if (cachedRecommendations && 
        cachedRecommendations.timestamp > Date.now() - this.cacheExpiry) {
      return cachedRecommendations.data;
    }
    
    try {
      // Get user data for personalization
      const user = await userRepository.findById(userId);
      
      if (!user) {
        return this.getFallbackRecommendations(limit);
      }
      
      // Get user's reviews
      const userReviews = await reviewRepository.findByUserId(userId);
      
      // Get favorite books
      const favoriteBooks = [];
      if (user.favorites && user.favorites.length > 0) {
        for (const bookId of user.favorites) {
          const book = await bookRepository.findById(bookId);
          if (book) {
            favoriteBooks.push(book);
          }
        }
      }
      
      // Prepare prompt for OpenAI
      const prompt = this.buildRecommendationPrompt(user, userReviews, favoriteBooks);
      
      // Call OpenAI API
      const response = await this.openai.createChatCompletion({
        model: "gpt-4mini",
        messages: [
          { role: "system", content: "You are a book recommendation system. Return recommendations as a JSON array of book objects with title, author, and a short reason for recommendation." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      });
      
      // Parse recommendations from response
      const recommendationsText = response.data.choices[0].message.content.trim();
      let recommendations = [];
      
      try {
        // Extract JSON from response (might be wrapped in backticks or have explanation)
        const jsonMatch = recommendationsText.match(/\[.*\]/s);
        if (jsonMatch) {
          recommendations = JSON.parse(jsonMatch[0]);
        } else {
          recommendations = JSON.parse(recommendationsText);
        }
      } catch (error) {
        console.error('Failed to parse recommendations:', error);
        return this.getFallbackRecommendations(limit);
      }
      
      // Find matching books in the database or use as-is if not found
      const processedRecommendations = await this.processRecommendations(recommendations, limit);
      
      // Cache results
      this.recommendationCache.set(cacheKey, {
        data: processedRecommendations,
        timestamp: Date.now()
      });
      
      return processedRecommendations;
    } catch (error) {
      console.error('Recommendation error:', error);
      return this.getFallbackRecommendations(limit);
    }
  }
  
  buildRecommendationPrompt(user, reviews, favoriteBooks) {
    let prompt = `Generate ${limit} book recommendations for a reader with the following preferences:\n\n`;
    
    // Add favorite books
    if (favoriteBooks.length > 0) {
      prompt += 'Favorite books:\n';
      favoriteBooks.forEach(book => {
        prompt += `- "${book.title}" by ${book.author}\n`;
      });
      prompt += '\n';
    }
    
    // Add reviews
    if (reviews.length > 0) {
      prompt += 'Book ratings and reviews:\n';
      reviews.forEach(review => {
        const book = favoriteBooks.find(b => b.id === review.bookId);
        if (book) {
          prompt += `- Rated "${book.title}" by ${book.author}: ${review.rating}/5\n`;
        }
      });
      prompt += '\n';
    }
    
    prompt += 'Please recommend books with title, author, and a short reason for recommendation.';
    return prompt;
  }
  
  async processRecommendations(recommendations, limit) {
    // Try to match recommendations with books in the database
    const processedRecommendations = [];
    
    for (const rec of recommendations) {
      if (processedRecommendations.length >= limit) break;
      
      // Look for matching book in database by title and author
      const matchingBooks = await bookRepository.query(book => 
        book.title.toLowerCase().includes(rec.title.toLowerCase()) ||
        rec.title.toLowerCase().includes(book.title.toLowerCase())
      );
      
      if (matchingBooks.length > 0) {
        // Use the database book with the AI-provided reason
        processedRecommendations.push({
          ...matchingBooks[0],
          reason: rec.reason
        });
      } else {
        // Use the AI-provided book as-is
        processedRecommendations.push({
          id: null, // Indicates this is not from the database
          title: rec.title,
          author: rec.author,
          reason: rec.reason,
          coverImage: null // No cover image for books not in the database
        });
      }
    }
    
    return processedRecommendations;
  }
  
  async getFallbackRecommendations(limit) {
    // Fallback to top-rated books
    const books = await bookRepository.findAll();
    
    // Sort by average rating and return top 'limit'
    const topBooks = books
      .filter(book => book.averageRating > 0)
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, limit)
      .map(book => ({
        ...book,
        reason: 'This is a highly-rated book on our platform'
      }));
    
    return topBooks;
  }
}

module.exports = new RecommendationService();
```

## 8. Controller Implementation

### 8.1 Base Controller Pattern

```javascript
// utils/baseController.js
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

class BaseController {
  constructor(service) {
    this.service = service;
  }
  
  // Generic CRUD operations that can be inherited by specific controllers
  
  getAll = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const result = await this.service.getAll(page, limit);
    return ApiResponse.success(res, result);
  });
  
  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const item = await this.service.getById(id);
    
    if (!item) {
      return ApiResponse.notFound(res);
    }
    
    return ApiResponse.success(res, item);
  });
  
  create = asyncHandler(async (req, res) => {
    const result = await this.service.create(req.body);
    return ApiResponse.created(res, result);
  });
  
  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await this.service.update(id, req.body);
    
    if (!result) {
      return ApiResponse.notFound(res);
    }
    
    return ApiResponse.success(res, result);
  });
  
  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const success = await this.service.delete(id);
    
    if (!success) {
      return ApiResponse.notFound(res);
    }
    
    return ApiResponse.success(res, { message: 'Resource deleted successfully' });
  });
}

module.exports = BaseController;
```

### 8.2 Book Controller Example

```javascript
// controllers/bookController.js
const BaseController = require('../utils/baseController');
const bookService = require('../services/bookService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

class BookController extends BaseController {
  constructor() {
    super(bookService);
  }
  
  // Override or add specific methods
  
  search = asyncHandler(async (req, res) => {
    const { query } = req.query;
    
    if (!query || query.trim() === '') {
      return ApiResponse.badRequest(res, 'Search query is required');
    }
    
    const results = await bookService.search(query);
    return ApiResponse.success(res, results);
  });
  
  getBookWithReviews = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const result = await bookService.getBookWithReviews(id, page, limit);
    
    if (!result.book) {
      return ApiResponse.notFound(res, 'Book not found');
    }
    
    return ApiResponse.success(res, result);
  });
}

module.exports = new BookController();
```

## 9. Error Handling Strategy

### 9.1 Central Error Handler Middleware

```javascript
// middleware/errorHandler.js
const ApiResponse = require('../utils/apiResponse');
const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error(`Error: ${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    return ApiResponse.badRequest(res, err.message, err.details);
  }
  
  if (err.name === 'UnauthorizedError') {
    return ApiResponse.unauthorized(res, err.message);
  }
  
  if (err.name === 'ForbiddenError') {
    return ApiResponse.forbidden(res, err.message);
  }
  
  // Default error response
  return ApiResponse.serverError(res, err.message);
};

module.exports = errorHandler;
```

### 9.2 Async Handler Utility

```javascript
// utils/asyncHandler.js
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
```

### 9.3 API Response Utility

```javascript
// utils/apiResponse.js
class ApiResponse {
  static success(res, data = {}, meta = {}) {
    return res.status(200).json({
      status: 'success',
      data,
      meta
    });
  }
  
  static created(res, data = {}) {
    return res.status(201).json({
      status: 'success',
      data
    });
  }
  
  static badRequest(res, message = 'Bad request', details = []) {
    return res.status(400).json({
      status: 'error',
      error: {
        code: 400,
        message,
        details
      }
    });
  }
  
  static unauthorized(res, message = 'Unauthorized') {
    return res.status(401).json({
      status: 'error',
      error: {
        code: 401,
        message
      }
    });
  }
  
  static forbidden(res, message = 'Forbidden') {
    return res.status(403).json({
      status: 'error',
      error: {
        code: 403,
        message
      }
    });
  }
  
  static notFound(res, message = 'Resource not found') {
    return res.status(404).json({
      status: 'error',
      error: {
        code: 404,
        message
      }
    });
  }
  
  static serverError(res, message = 'Internal server error') {
    return res.status(500).json({
      status: 'error',
      error: {
        code: 500,
        message
      }
    });
  }
}

module.exports = ApiResponse;
```

## 10. Validation Strategy

### 10.1 Validation Middleware

```javascript
// middleware/validation.js
const ApiResponse = require('../utils/apiResponse');
const validators = require('../utils/validators');

const validation = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      
      if (error) {
        const details = error.details.map(detail => ({
          field: detail.context.key,
          message: detail.message.replace(/['"]/g, '')
        }));
        
        return ApiResponse.badRequest(
          res,
          'Validation error',
          details
        );
      }
      
      next();
    };
  },
  
  validateParams: (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.params);
      
      if (error) {
        return ApiResponse.badRequest(
          res,
          'Invalid parameters',
          error.details.map(detail => detail.message)
        );
      }
      
      next();
    };
  },
  
  validateQuery: (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.query);
      
      if (error) {
        return ApiResponse.badRequest(
          res,
          'Invalid query parameters',
          error.details.map(detail => detail.message)
        );
      }
      
      next();
    };
  }
};

module.exports = validation;
```

### 10.2 Validation Schemas

```javascript
// utils/validators.js
const Joi = require('joi');

const schemas = {
  // User validation schemas
  userRegister: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required()
  }),
  
  userLogin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  
  userUpdate: Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email()
  }),
  
  // Review validation schemas
  reviewCreate: Joi.object({
    text: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required()
  }),
  
  reviewUpdate: Joi.object({
    text: Joi.string(),
    rating: Joi.number().integer().min(1).max(5)
  }).min(1),
  
  // Common validation schemas
  id: Joi.object({
    id: Joi.string().uuid().required()
  }),
  
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10)
  })
};

module.exports = schemas;
```

## 11. Testing Strategy

### 11.1 Unit Testing

Unit tests focus on isolated components (services, repositories, controllers):

- Test individual functions and methods
- Mock dependencies
- Verify expected behavior
- Cover edge cases and error scenarios

### 11.2 Integration Testing

Integration tests verify interaction between components:

- Test API endpoints with a test database
- Verify request/response cycle
- Test authentication flows
- Verify data persistence

### 11.3 Test Example

```javascript
// tests/unit/services/authService.test.js
const authService = require('../../../src/services/authService');
const userRepository = require('../../../src/repositories/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('../../../src/repositories/userRepository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('register', () => {
    test('should register a new user and return token', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };
      
      const createdUser = {
        id: '123',
        email: userData.email,
        password: 'hashedpassword',
        name: userData.name,
        favorites: []
      };
      
      const token = 'fake-jwt-token';
      
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.create.mockResolvedValue(createdUser);
      jwt.sign.mockReturnValue(token);
      
      // Act
      const result = await authService.register(userData);
      
      // Assert
      expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
      expect(userRepository.create).toHaveBeenCalledWith(userData);
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: createdUser.id },
        expect.any(String),
        expect.any(Object)
      );
      
      expect(result).toEqual({
        user: {
          id: createdUser.id,
          email: createdUser.email,
          name: createdUser.name,
          favorites: []
        },
        token
      });
    });
    
    test('should throw error if email is already in use', async () => {
      // Arrange
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Test User'
      };
      
      userRepository.findByEmail.mockResolvedValue({
        id: '456',
        email: userData.email
      });
      
      // Act & Assert
      await expect(authService.register(userData)).rejects.toThrow('Email already in use');
    });
  });
  
  // More tests for login, getCurrentUser, etc.
});
```

## 12. Performance Optimization

### 12.1 File-Based Storage Optimization

- In-memory data caching
- Optimized queries with indexing
- Batched write operations
- File locking for concurrent access

### 12.2 API Response Optimization

- Response compression
- Pagination for list endpoints
- Selective field inclusion (if needed)
- Caching for expensive operations (e.g., recommendations)

## 13. Security Considerations

### 13.1 Data Protection

- Password hashing with bcrypt (10 rounds)
- JWT token security (proper signing, expiry)
- Input validation and sanitization
- Protection against common web vulnerabilities

### 13.2 API Security

- Rate limiting (prevent abuse)
- Request validation
- CORS configuration
- Security headers (Helmet middleware)

## 14. Logging and Monitoring

### 14.1 Logging Strategy

- Structured JSON logs
- Different log levels (error, warn, info, debug)
- Request/response logging middleware
- Error logging with stack traces

### 14.2 Logging Implementation

```javascript
// config/logger.js
const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'book-review-api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/combined.log')
    })
  ]
});

module.exports = logger;
```

---

**Approved by:**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Backend Lead |  |  |  |
| Technical Lead |  |  |  |
