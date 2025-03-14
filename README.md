# CRM System

## Project Overview
The CRM (Customer Relationship Management) system is designed to help business owners manage their customer relationships effectively. This project showcases a full-stack solution with a focus on security, scalability, and comprehensive business management features.

## Key Technologies
- **Frontend**: React, TypeScript, TailwindCSS, Radix UI
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with session management
- **Validation**: Zod schema validation
- **Security**: Scrypt password hashing, Rate limiting, CSRF protection

## Security Measures
- **Cryptographic password hashing**: Using scrypt for secure password storage.
- **Rate limiting**: To prevent brute force attacks.
- **Secure session management**: Ensuring data privacy and protection.
- **Input validation**: Zod schema validation on all endpoints.
- **Role-based access control**: Admin features protected by role-based permissions.
- **Environment variables protection**: Through Replit Secrets.
- **CSRF protection**: Implemented through session tokens.

## Key Features for Contractors/Clients

### Lead Management
- Status tracking
- Company information
- Contact details
- Notes functionality
- Lead pipeline management

### Contact Management
- Comprehensive contact profiles
- Company affiliations
- Communication history
- Contact categorization

### Task Management
- Due date tracking
- Task completion status
- Task descriptions
- Task prioritization

### Security Features
- User-specific data isolation
- Role-based permissions
- Secure authentication
- Rate-limited API endpoints

