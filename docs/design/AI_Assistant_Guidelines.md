# AI Assistant Guidelines for BookReview Platform Development

**Document Version:** 1.0  
**Date:** September 2, 2025  
**Author:** Internal Assignment Team

## 1. Purpose

This document outlines the guidelines and instructions for AI assistants supporting the development of the BookReview Platform. It establishes protocols for code generation, problem-solving, and documentation support while ensuring alignment with project requirements and coding standards.

## 2. General Guidelines

### 2.1 Project Understanding Requirements

The AI assistant must:

- Have a comprehensive understanding of the BookReview Platform architecture (frontend, backend, data models)
- Be familiar with the component diagrams, data models, and API specifications
- Reference the appropriate design documents when providing assistance
- Consider the current implementation phase when making suggestions

### 2.2 Code Quality Standards

When generating or suggesting code, ensure:

- Adherence to established project coding standards
- Proper error handling and validation
- Defensive programming practices
- Consistent naming conventions
- Comprehensive comments for complex logic
- Testability of generated code

### 2.3 Technology Stack Alignment

Code and solutions must align with the project's defined technology stack:

- **Frontend:** React.js with Context API, Axios for API calls
- **Backend:** Express.js with Node.js, JWT authentication
- **Data Storage:** File-based JSON storage with Repository pattern
- **External Services:** OpenAI API integration for recommendations

## 3. Task-Specific Guidelines

### 3.1 Code Generation

When generating code:

- Include complete import statements
- Provide proper TypeScript/JSDoc typing where applicable
- Include error handling for async operations
- Add comments explaining complex logic or design decisions
- Ensure consistency with existing codebase patterns
- Consider performance implications
- Include suggestions for tests when appropriate

### 3.2 Debugging Assistance

When helping with debugging:

- Ask for relevant error messages and stack traces
- Request context about the issue (when it occurs, frequency, etc.)
- Follow a systematic debugging approach
- Suggest debugging tools and techniques appropriate for the tech stack
- Consider potential edge cases and race conditions
- Provide explanations alongside solutions to build developer understanding

### 3.3 Architecture and Design Guidance

When providing architectural advice:

- Reference and adhere to the established design documents
- Consider the scalability implications of suggestions
- Respect the separation of concerns in the layered architecture
- Align with the repository pattern for data access
- Ensure proper componentization in frontend suggestions
- Consider future migration path from file-based to database storage

### 3.4 Security Considerations

For all code and suggestions:

- Implement proper authentication and authorization checks
- Prevent common vulnerabilities (XSS, CSRF, etc.)
- Ensure secure handling of user data and passwords
- Use proper input validation and sanitization
- Implement rate limiting where appropriate
- Follow secure coding practices

## 4. Feature-Specific Guidelines

### 4.1 Authentication System

When working on authentication:

- Ensure proper JWT implementation and verification
- Follow secure password handling practices (hashing, not storing plaintext)
- Implement proper session management
- Include token refresh mechanisms
- Consider authorization for different user actions

### 4.2 Book Management

For book-related features:

- Implement proper validation for book properties
- Ensure efficient search and filtering capabilities
- Consider pagination for book listings
- Implement proper image handling for book covers

### 4.3 Review System

For review functionality:

- Ensure proper user authentication before allowing reviews
- Implement data validation for ratings (1-5 scale)
- Update book average ratings when reviews are added/modified
- Prevent duplicate reviews from the same user

### 4.4 Recommendation System

When working on the AI recommendation feature:

- Follow best practices for OpenAI API integration
- Implement caching strategies to reduce API calls
- Consider user preferences and reading history
- Ensure proper error handling for API failures
- Implement fallback recommendations when AI is unavailable

### 4.5 User Profile Management

For user profile features:

- Ensure secure handling of user personal information
- Implement proper validation for profile updates
- Maintain user favorites list efficiently
- Consider privacy concerns in profile visibility

## 5. Testing Guidelines

When assisting with tests:

- Suggest appropriate test frameworks (Jest for both frontend and backend)
- Include unit tests for isolated functions and components
- Suggest integration tests for API endpoints and service interactions
- Consider edge cases and error scenarios in test coverage
- Follow the AAA pattern (Arrange, Act, Assert)
- Suggest mocking strategies for external dependencies

## 6. Documentation Support

When helping with documentation:

- Follow established documentation formats
- Include code examples where appropriate
- Ensure consistency with existing documentation
- Suggest updates to documentation when implementation changes
- Include explanations suitable for developers of varying experience levels

## 7. Performance Considerations

Always consider:

- Algorithmic efficiency of suggested solutions
- Appropriate caching strategies
- Optimized database queries and data access patterns
- Frontend performance optimizations (memoization, code splitting)
- Resource usage implications

## 8. Accessibility and Responsiveness

For frontend assistance:

- Suggest accessible implementations (ARIA attributes, semantic HTML)
- Consider keyboard navigation in UI components
- Ensure responsive design principles are followed
- Consider color contrast and readability

## 9. Code Review Guidelines

When conducting or assisting with code reviews:

- Focus on both functional correctness and code quality
- Identify potential security issues
- Suggest performance improvements
- Check for proper error handling
- Verify alignment with project architecture
- Look for test coverage

## 10. Implementation Phases Awareness

Always consider the current implementation phase:

- **Phase 1 (Setup):** Focus on project structure, authentication, and core data models
- **Phase 2 (Core Features):** Book management, review system, user profiles
- **Phase 3 (Advanced Features):** Recommendation system, search optimization, favorites
- **Phase 4 (Testing/Deployment):** Testing coverage, performance optimizations, deployment

## 11. Response Format

Structure assistance as follows:

1. **Understanding:** Brief restatement of the problem or request
2. **Approach:** Explanation of the suggested approach or solution
3. **Implementation:** Code snippets or detailed steps
4. **Explanation:** Description of how the solution works
5. **Considerations:** Notes on edge cases, alternatives, or potential issues
6. **Next Steps:** Suggestions for testing or further development

## 12. Learning Resources

When appropriate, suggest learning resources relevant to:

- React.js component patterns and hooks
- Express.js best practices
- JWT authentication implementation
- File-based data storage patterns
- OpenAI API integration techniques

---

**Approved by:**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Technical Lead |  |  |  |
| Project Manager |  |  |  |
