# API Specification Document: BookReview Platform

**Document Version:** 1.0  
**Date:** September 2, 2025  
**Author:** Internal Assignment Team

## 1. Overview

This document outlines the API specifications for the BookReview Platform, which allows users to search for books, read and write reviews, manage favorites, and receive personalized book recommendations.

## 2. Base URL

```
http://localhost:3000/api/v1
```

For production:

```
https://bookreview-api.example.com/api/v1
```

## 3. Authentication

### Authentication Endpoints

#### Register a new user

- **Endpoint:** `POST /auth/register`
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "id": "uuid",
      "name": "string",
      "email": "string",
      "token": "jwt-token"
    }
  }
  ```
- **Status Codes:**
  - 201: Created
  - 400: Bad Request
  - 409: Conflict (Email already exists)

#### Login

- **Endpoint:** `POST /auth/login`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "id": "uuid",
      "name": "string",
      "email": "string",
      "token": "jwt-token"
    }
  }
  ```
- **Status Codes:**
  - 200: OK
  - 400: Bad Request
  - 401: Unauthorized

### Authentication Header

All protected endpoints require the following header:

```
Authorization: Bearer <jwt-token>
```

## 4. Books API

### Get All Books

- **Endpoint:** `GET /books`
- **Query Parameters:**
  - `page` (integer, default=1): Page number
  - `limit` (integer, default=10): Items per page
  - `search` (string, optional): Search term
  - `genre` (string, optional): Filter by genre
  - `sortBy` (string, optional): Sort field (title, publishedYear, averageRating)
  - `sortOrder` (string, optional): asc or desc
- **Response:**
  ```json
  {
    "success": true,
    "count": 50,
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalPages": 5,
      "nextPage": 2,
      "prevPage": null
    },
    "data": [
      {
        "id": "uuid",
        "title": "string",
        "author": "string",
        "description": "string",
        "coverImage": "string",
        "genres": ["string"],
        "publishedYear": 2023,
        "averageRating": 4.5,
        "reviewCount": 120
      }
    ]
  }
  ```
- **Status Codes:**
  - 200: OK
  - 400: Bad Request

### Get Book by ID

- **Endpoint:** `GET /books/:id`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid",
      "title": "string",
      "author": "string",
      "description": "string",
      "coverImage": "string",
      "genres": ["string"],
      "publishedYear": 2023,
      "averageRating": 4.5,
      "reviewCount": 120
    }
  }
  ```
- **Status Codes:**
  - 200: OK
  - 404: Not Found

### Add New Book

- **Endpoint:** `POST /books`
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "title": "string",
    "author": "string",
    "description": "string",
    "coverImage": "string",
    "genres": ["string"],
    "publishedYear": 2023
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book added successfully",
    "data": {
      "id": "uuid",
      "title": "string",
      "author": "string",
      "description": "string",
      "coverImage": "string",
      "genres": ["string"],
      "publishedYear": 2023,
      "averageRating": 0,
      "reviewCount": 0
    }
  }
  ```
- **Status Codes:**
  - 201: Created
  - 400: Bad Request
  - 401: Unauthorized

### Update Book

- **Endpoint:** `PUT /books/:id`
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "title": "string",
    "author": "string",
    "description": "string",
    "coverImage": "string",
    "genres": ["string"],
    "publishedYear": 2023
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book updated successfully",
    "data": {
      "id": "uuid",
      "title": "string",
      "author": "string",
      "description": "string",
      "coverImage": "string",
      "genres": ["string"],
      "publishedYear": 2023,
      "averageRating": 4.5,
      "reviewCount": 120
    }
  }
  ```
- **Status Codes:**
  - 200: OK
  - 400: Bad Request
  - 401: Unauthorized
  - 404: Not Found

### Delete Book

- **Endpoint:** `DELETE /books/:id`
- **Authentication:** Required
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book deleted successfully"
  }
  ```
- **Status Codes:**
  - 200: OK
  - 401: Unauthorized
  - 404: Not Found

## 5. Reviews API

### Get Reviews for a Book

- **Endpoint:** `GET /books/:bookId/reviews`
- **Query Parameters:**
  - `page` (integer, default=1): Page number
  - `limit` (integer, default=10): Items per page
  - `sortBy` (string, optional): Sort field (rating, timestamp)
  - `sortOrder` (string, optional): asc or desc
- **Response:**
  ```json
  {
    "success": true,
    "count": 50,
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalPages": 5,
      "nextPage": 2,
      "prevPage": null
    },
    "data": [
      {
        "id": "uuid",
        "bookId": "uuid",
        "userId": "uuid",
        "user": {
          "id": "uuid",
          "name": "string"
        },
        "text": "string",
        "rating": 5,
        "timestamp": "2023-09-01T12:00:00Z"
      }
    ]
  }
  ```
- **Status Codes:**
  - 200: OK
  - 400: Bad Request
  - 404: Not Found

### Add Review

- **Endpoint:** `POST /books/:bookId/reviews`
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "text": "string",
    "rating": 5
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Review added successfully",
    "data": {
      "id": "uuid",
      "bookId": "uuid",
      "userId": "uuid",
      "text": "string",
      "rating": 5,
      "timestamp": "2023-09-01T12:00:00Z"
    }
  }
  ```
- **Status Codes:**
  - 201: Created
  - 400: Bad Request
  - 401: Unauthorized
  - 404: Not Found

### Update Review

- **Endpoint:** `PUT /reviews/:id`
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "text": "string",
    "rating": 4
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Review updated successfully",
    "data": {
      "id": "uuid",
      "bookId": "uuid",
      "userId": "uuid",
      "text": "string",
      "rating": 4,
      "timestamp": "2023-09-01T12:00:00Z"
    }
  }
  ```
- **Status Codes:**
  - 200: OK
  - 400: Bad Request
  - 401: Unauthorized
  - 403: Forbidden (Not review owner)
  - 404: Not Found

### Delete Review

- **Endpoint:** `DELETE /reviews/:id`
- **Authentication:** Required
- **Response:**
  ```json
  {
    "success": true,
    "message": "Review deleted successfully"
  }
  ```
- **Status Codes:**
  - 200: OK
  - 401: Unauthorized
  - 403: Forbidden (Not review owner)
  - 404: Not Found

## 6. User Profile API

### Get User Profile

- **Endpoint:** `GET /users/profile`
- **Authentication:** Required
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid",
      "name": "string",
      "email": "string",
      "favorites": [
        {
          "id": "uuid",
          "title": "string",
          "author": "string",
          "coverImage": "string"
        }
      ]
    }
  }
  ```
- **Status Codes:**
  - 200: OK
  - 401: Unauthorized

### Update User Profile

- **Endpoint:** `PUT /users/profile`
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string" // Optional
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Profile updated successfully",
    "data": {
      "id": "uuid",
      "name": "string",
      "email": "string"
    }
  }
  ```
- **Status Codes:**
  - 200: OK
  - 400: Bad Request
  - 401: Unauthorized

### Get User Reviews

- **Endpoint:** `GET /users/reviews`
- **Authentication:** Required
- **Query Parameters:**
  - `page` (integer, default=1): Page number
  - `limit` (integer, default=10): Items per page
- **Response:**
  ```json
  {
    "success": true,
    "count": 15,
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalPages": 2,
      "nextPage": 2,
      "prevPage": null
    },
    "data": [
      {
        "id": "uuid",
        "bookId": "uuid",
        "book": {
          "id": "uuid",
          "title": "string",
          "author": "string",
          "coverImage": "string"
        },
        "text": "string",
        "rating": 5,
        "timestamp": "2023-09-01T12:00:00Z"
      }
    ]
  }
  ```
- **Status Codes:**
  - 200: OK
  - 401: Unauthorized

## 7. Favorites API

### Add Book to Favorites

- **Endpoint:** `POST /users/favorites/:bookId`
- **Authentication:** Required
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book added to favorites",
    "data": {
      "id": "uuid",
      "title": "string",
      "author": "string",
      "coverImage": "string"
    }
  }
  ```
- **Status Codes:**
  - 200: OK
  - 401: Unauthorized
  - 404: Not Found

### Remove Book from Favorites

- **Endpoint:** `DELETE /users/favorites/:bookId`
- **Authentication:** Required
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book removed from favorites"
  }
  ```
- **Status Codes:**
  - 200: OK
  - 401: Unauthorized
  - 404: Not Found

### Get User Favorites

- **Endpoint:** `GET /users/favorites`
- **Authentication:** Required
- **Query Parameters:**
  - `page` (integer, default=1): Page number
  - `limit` (integer, default=10): Items per page
- **Response:**
  ```json
  {
    "success": true,
    "count": 25,
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalPages": 3,
      "nextPage": 2,
      "prevPage": null
    },
    "data": [
      {
        "id": "uuid",
        "title": "string",
        "author": "string",
        "coverImage": "string",
        "averageRating": 4.5
      }
    ]
  }
  ```
- **Status Codes:**
  - 200: OK
  - 401: Unauthorized

## 8. Recommendations API

### Get Book Recommendations

- **Endpoint:** `GET /recommendations`
- **Authentication:** Required
- **Query Parameters:**
  - `limit` (integer, default=5): Number of recommendations
- **Response:**
  ```json
  {
    "success": true,
    "message": "Recommendations generated successfully",
    "data": [
      {
        "id": "uuid",
        "title": "string",
        "author": "string",
        "description": "string",
        "coverImage": "string",
        "averageRating": 4.5,
        "reason": "Based on your interest in fantasy novels"
      }
    ]
  }
  ```
- **Status Codes:**
  - 200: OK
  - 401: Unauthorized
  - 404: Not enough data for recommendations

## 9. Error Responses

All error responses follow this structure:

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": {} // Optional additional information
  }
}
```

Common error codes:

- `INVALID_REQUEST`: Request validation failed
- `RESOURCE_NOT_FOUND`: Requested resource not found
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `CONFLICT`: Resource conflict
- `INTERNAL_ERROR`: Server error

## 10. Rate Limiting

API requests are rate-limited to prevent abuse:

- 100 requests per IP address per minute
- 1000 requests per user (authenticated) per hour

Rate limit headers included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1630512000
```

---

**Approved by:**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Technical Lead |  |  |  |
