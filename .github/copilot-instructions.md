# BookReview Platform - Guidelines for AI Coding Assistants

This guide provides essential information for AI assistants to help with the BookReview Platform project.

## Project Architecture

The BookReview Platform follows a client-server architecture:

- **Frontend**: React.js application with component-based architecture
- **Backend**: Express.js application using repository pattern for data access
- **Data Storage**: File-based JSON storage (designed for future migration to a database)
- **External Services**: OpenAI API integration for book recommendations

## Directory Structure

```
/
├── frontend/               # React application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components 
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── store/          # State management (Context API)
│   │   └── utils/          # Helper functions
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Data models
│   │   ├── repositories/   # Data access layer
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helper utilities
│   └── data/               # JSON file storage
│       ├── users.json      # User data store
│       ├── books.json      # Book data store
│       └── reviews.json    # Review data store
└── docs/                   # Project documentation
```

## Key Design Patterns

1. **Repository Pattern**: All data access is through repository classes that abstract the file-based storage
   - Example: `backend/src/repositories/baseRepository.js` provides common CRUD operations

2. **Service Layer Pattern**: Business logic is in service classes that use repositories
   - Example: `backend/src/services/reviewService.js` handles review creation and updates book ratings

3. **Component Composition**: UI built from reusable, smaller components
   - Example: `BookCard`, `Rating`, `ReviewForm` components are combined for book details page

## Development Workflow

1. **Setup**:
   - Frontend: `cd frontend && npm install && npm start`
   - Backend: `cd backend && npm install && npm start`

2. **Testing**:
   - Frontend: `cd frontend && npm test`
   - Backend: `cd backend && npm test`

3. **Code Style**:
   - ESLint and Prettier are configured for consistent code style
   - Run `npm run lint` to check code quality

## Project-Specific Conventions

1. **Data Access**: Always use repository methods, never direct file operations
   ```javascript
   // CORRECT
   const books = await bookRepository.findAll();
   
   // INCORRECT
   const data = JSON.parse(fs.readFileSync('data/books.json'));
   ```

2. **Error Handling**: Use the standardized error response format
   ```javascript
   return res.status(400).json({
     success: false,
     error: {
       code: 'INVALID_REQUEST',
       message: 'Invalid book data provided'
     }
   });
   ```

3. **Authentication**: All protected routes use the auth middleware
   ```javascript
   router.post('/books', authMiddleware, bookController.createBook);
   ```

4. **API Response Format**: Consistent structure for all endpoints
   ```javascript
   {
     "success": true,
     "data": { /* response data */ },
     "pagination": { /* optional pagination info */ }
   }
   ```

## Important Cross-Component Interactions

1. **Review Creation Flow**:
   - Frontend posts review data to API
   - Backend validates review in controller
   - Review service creates review and updates book's average rating
   - Repository layer handles data persistence

2. **Recommendation System**:
   - User requests recommendations
   - Backend collects user preferences and history
   - RecommendationService creates prompt for OpenAI API
   - Results are processed and returned to frontend

## Key Implementation Files

- **Authentication**: `backend/src/middleware/auth.js`, `backend/src/services/authService.js`
- **Data Storage**: `backend/src/repositories/baseRepository.js`
- **API Routes**: `backend/src/routes/index.js`
- **Frontend State**: `frontend/src/store/AuthContext.js`, `frontend/src/store/BooksContext.js`
- **API Integration**: `frontend/src/services/api.js`

## Phase-Based Development

The project follows a 4-phase implementation plan:
1. Setup & Infrastructure (authentication, project structure)
2. Core Features (books, reviews, profiles)
3. Advanced Features (ratings, recommendations)
4. Testing & Deployment (unit tests, infrastructure as code)

When making changes, consider which phase the feature belongs to and follow existing patterns in that area.
