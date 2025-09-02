# Phase 2: Core Features - User Stories

**Phase Duration:** 2 weeks  
**Dependencies:** Phase 1 completion  
**Objective:** Implement the core functionality related to books, reviews, and user profiles.

## User Story 2.1: Book Listing

**As a user, I want to view a paginated list of all books so that I can browse through the available books.**

**Acceptance Criteria:**
- Books are displayed in a grid or list format
- Pagination controls are available
- Each book card shows basic information (title, author, cover image)
- Loading state is shown while fetching books
- Error handling if book data cannot be loaded

**Story Points:** 5

## User Story 2.2: Book Search

**As a user, I want to search for books by title or author so that I can find specific books quickly.**

**Acceptance Criteria:**
- Search input is prominently displayed
- Search works for both title and author
- Results update as the user types
- Empty state is shown when no results are found
- Search history is preserved during the session

**Story Points:** 5

## User Story 2.3: Book Detail View

**As a user, I want to view detailed information about a book so that I can learn more about it.**

**Acceptance Criteria:**
- Detailed view shows all book information
- Book cover image is prominently displayed
- Book description is shown
- Genre tags are displayed
- Published year is shown
- Average rating and review count is displayed (if available)

**Story Points:** 4

## User Story 2.4: Create Review

**As a user, I want to create reviews for books so that I can share my opinion about them.**

**Acceptance Criteria:**
- Review form is accessible from the book detail page
- Rating selection (1-5 stars) is available
- Text field for review content
- Submit button to save the review
- Validation for required fields
- Feedback upon successful submission
- Error handling if submission fails

**Story Points:** 5

## User Story 2.5: View Reviews

**As a user, I want to read reviews from other users so that I can make informed decisions about books.**

**Acceptance Criteria:**
- Reviews are displayed on the book detail page
- Reviews show author name, rating, date, and content
- Reviews are sorted by date (newest first)
- Pagination if there are many reviews
- Empty state if there are no reviews

**Story Points:** 3

## User Story 2.6: Edit and Delete Review

**As a user, I want to edit or delete my own reviews so that I can correct or remove my content.**

**Acceptance Criteria:**
- Edit and delete options are visible only for the user's own reviews
- Edit form pre-populated with existing review data
- Confirmation dialog before deletion
- Feedback upon successful edit/delete
- Error handling if operation fails

**Story Points:** 4

## User Story 2.7: User Profile

**As a user, I want to view my profile so that I can see my activity on the platform.**

**Acceptance Criteria:**
- Profile shows user name
- List of reviews written by the user
- Reviews are linked to the respective books
- Option to edit user information
- Empty state if the user has no reviews

**Story Points:** 4

## User Story 2.8: Favorite Books

**As a user, I want to mark/unmark books as favorites so that I can keep track of books I like.**

**Acceptance Criteria:**
- Favorite button on book cards and detail pages
- Visual indication of favorite status
- Add/remove from favorites without page reload
- List of favorite books in user profile
- Empty state if no favorites

**Story Points:** 4

**Total Story Points for Phase 2:** 34
