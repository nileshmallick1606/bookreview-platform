# Data Model Document: BookReview Platform

**Document Version:** 1.0  
**Date:** September 2, 2025  
**Author:** Internal Assignment Team

## 1. Overview

This document defines the data model for the BookReview Platform. It outlines the structure of data entities, their relationships, and the JSON schemas used for file-based storage.

## 2. Entity Relationship Diagram

```
┌───────────────────────┐       ┌───────────────────────┐
│        User           │       │         Book          │
├───────────────────────┤       ├───────────────────────┤
│ id: UUID              │       │ id: UUID              │
│ email: string         │       │ title: string         │
│ password: string      │       │ author: string        │
│ name: string          │       │ description: string   │
│ favorites: UUID[]     │       │ coverImage: string    │
└──────────┬────────────┘       │ genres: string[]      │
           │                    │ publishedYear: number │
           │                    │ averageRating: number │
           │                    │ reviewCount: number   │
           │                    └──────────┬────────────┘
           │                               │
           │                               │
           │                               │
           │                               │
┌──────────▼────────────────────────────▼──┐
│                  Review                   │
├───────────────────────────────────────────┤
│ id: UUID                                  │
│ bookId: UUID (FK to Book)                 │
│ userId: UUID (FK to User)                 │
│ text: string                              │
│ rating: number (1-5)                      │
│ timestamp: ISO date string                │
└───────────────────────────────────────────┘
```

## 3. File Structure

The BookReview Platform uses a file-based JSON storage system with the following structure:

```
/data
  │
  ├── users.json    # User data including favorites
  │
  ├── books.json    # Book information and metadata
  │
  └── reviews.json  # Review content and ratings
```

## 4. Data Models

### 4.1 User Model

```json
{
  "id": "string (UUID)",
  "email": "string (unique)",
  "password": "string (hashed)",
  "name": "string",
  "favorites": [
    "string (UUID)" // References to Book.id
  ],
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)"
}
```

#### Constraints:
- `id`: UUID v4 format, unique identifier
- `email`: Valid email format, unique
- `password`: Stored as bcrypt hash, minimum 8 characters before hashing
- `name`: 2-50 characters
- `favorites`: Array of book IDs, can be empty

### 4.2 Book Model

```json
{
  "id": "string (UUID)",
  "title": "string",
  "author": "string",
  "description": "string",
  "coverImage": "string (URL)",
  "genres": [
    "string"
  ],
  "publishedYear": "number",
  "averageRating": "number",
  "reviewCount": "number",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)"
}
```

#### Constraints:
- `id`: UUID v4 format, unique identifier
- `title`: 1-200 characters
- `author`: 1-100 characters
- `description`: 0-5000 characters
- `coverImage`: Valid URL or empty string
- `genres`: Array of genre strings, can be empty
- `publishedYear`: Integer between 1000 and current year
- `averageRating`: Decimal number between 0 and 5, calculated from reviews
- `reviewCount`: Integer, calculated from associated reviews

### 4.3 Review Model

```json
{
  "id": "string (UUID)",
  "bookId": "string (UUID)",
  "userId": "string (UUID)",
  "text": "string",
  "rating": "number",
  "timestamp": "string (ISO date)",
  "updatedAt": "string (ISO date)"
}
```

#### Constraints:
- `id`: UUID v4 format, unique identifier
- `bookId`: References a valid Book.id
- `userId`: References a valid User.id
- `text`: 0-5000 characters
- `rating`: Integer between 1 and 5
- `timestamp`: ISO date string, when the review was created

## 5. JSON Schemas

### 5.1 User JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User",
  "type": "object",
  "required": ["id", "email", "password", "name", "favorites", "createdAt", "updatedAt"],
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "password": {
      "type": "string",
      "minLength": 60,
      "maxLength": 60
    },
    "name": {
      "type": "string",
      "minLength": 2,
      "maxLength": 50
    },
    "favorites": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "uuid"
      }
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    }
  },
  "additionalProperties": false
}
```

### 5.2 Book JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Book",
  "type": "object",
  "required": ["id", "title", "author", "description", "coverImage", "genres", "publishedYear", "averageRating", "reviewCount", "createdAt", "updatedAt"],
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "author": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "description": {
      "type": "string",
      "maxLength": 5000
    },
    "coverImage": {
      "type": "string",
      "format": "uri-reference"
    },
    "genres": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "publishedYear": {
      "type": "integer",
      "minimum": 1000,
      "maximum": 2100
    },
    "averageRating": {
      "type": "number",
      "minimum": 0,
      "maximum": 5
    },
    "reviewCount": {
      "type": "integer",
      "minimum": 0
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    }
  },
  "additionalProperties": false
}
```

### 5.3 Review JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Review",
  "type": "object",
  "required": ["id", "bookId", "userId", "text", "rating", "timestamp", "updatedAt"],
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "bookId": {
      "type": "string",
      "format": "uuid"
    },
    "userId": {
      "type": "string",
      "format": "uuid"
    },
    "text": {
      "type": "string",
      "maxLength": 5000
    },
    "rating": {
      "type": "integer",
      "minimum": 1,
      "maximum": 5
    },
    "timestamp": {
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    }
  },
  "additionalProperties": false
}
```

## 6. Data Validation

Data validation is performed in multiple layers:

1. **Frontend Validation**:
   - Form validation using Formik and Yup
   - Client-side schema validation before API requests

2. **API Validation**:
   - Server-side validation using Express-validator
   - Request body validation against schemas

3. **Storage Validation**:
   - JSON schema validation before writing to files
   - Referential integrity checks for relationships

## 7. Indices and Performance

For the file-based storage system, the following indices are maintained:

1. **Users Index**:
   - Primary: `id`
   - Secondary: `email` (for login)

2. **Books Index**:
   - Primary: `id`
   - Secondary: `title` (for search)
   - Secondary: `author` (for search)
   - Secondary: `genres` (for filtering)

3. **Reviews Index**:
   - Primary: `id`
   - Secondary: `bookId` (for listing reviews by book)
   - Secondary: `userId` (for listing reviews by user)

These indices are maintained as in-memory maps for quick lookups during application runtime.

## 8. Data Integrity

### 8.1 Relationships

- **User-Review**: One-to-many (one user can write many reviews)
- **Book-Review**: One-to-many (one book can have many reviews)
- **User-Book**: Many-to-many (users can favorite multiple books)

### 8.2 Cascading Operations

- When a user is deleted:
  - All reviews by that user are deleted
  - User ID is removed from any book's review statistics

- When a book is deleted:
  - All reviews for that book are deleted
  - Book ID is removed from any user's favorites

### 8.3 Consistency

Since we're using a file-based storage system, transactions are handled by:

1. Reading the current state of the file
2. Making the changes in memory
3. Writing the entire updated content back to the file

This approach ensures atomic updates to each file, though it doesn't provide true cross-file transaction capabilities.

## 9. Data Migration Path

The file-based storage system is designed with a future migration path in mind:

1. The repository layer abstracts data access
2. JSON schemas align with potential SQL schema designs
3. Entity relationships are maintained in a way that can be mapped to relational tables

When migrating to a database:

1. Create tables based on the entity models
2. Write a migration script to import JSON data
3. Update repository implementations to use database connectors
4. Keep the service and controller layers unchanged

## 10. Sample Data

### 10.1 Sample User

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "email": "john.doe@example.com",
  "password": "$2b$10$X7OjfBKVgRmZ4SjJ9TLJxOpzHJI.oO9GG3vC6QI7x/xD3NE0.wJF.",
  "name": "John Doe",
  "favorites": [
    "7d9dc84a-0114-4b3e-8343-e1228d631383",
    "91b11af6-6d9d-4d6c-a3a5-6536f6ad6747"
  ],
  "createdAt": "2023-07-15T08:30:45.123Z",
  "updatedAt": "2023-08-20T14:22:10.987Z"
}
```

### 10.2 Sample Book

```json
{
  "id": "7d9dc84a-0114-4b3e-8343-e1228d631383",
  "title": "The Design of Everyday Things",
  "author": "Don Norman",
  "description": "A classic book about human-centered design...",
  "coverImage": "https://images.example.com/covers/design-everyday-things.jpg",
  "genres": ["Design", "Psychology", "Non-fiction"],
  "publishedYear": 1988,
  "averageRating": 4.7,
  "reviewCount": 128,
  "createdAt": "2023-06-10T12:15:30.000Z",
  "updatedAt": "2023-08-22T09:45:12.345Z"
}
```

### 10.3 Sample Review

```json
{
  "id": "b07a9c29-8ee6-4dc2-9a8a-d6f62d4c5dfa",
  "bookId": "7d9dc84a-0114-4b3e-8343-e1228d631383",
  "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "text": "This book completely changed how I think about design...",
  "rating": 5,
  "timestamp": "2023-08-15T18:22:33.456Z",
  "updatedAt": "2023-08-15T18:22:33.456Z"
}
```

---

**Approved by:**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Technical Lead |  |  |  |
