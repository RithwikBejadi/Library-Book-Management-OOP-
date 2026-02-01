# Library Book Management System

A RESTful API backend for managing library books built with TypeScript, Express, and MongoDB using Object-Oriented Programming principles.

## Implemented Features

- **Full CRUD Operations**
- **Search & Filter** 
- **Pagination & Sorting**
- **Validation**
- **Error Handling**
- **OOP Architecture**

## Tech Stack

- **TypeScript**
- **Express**
- **MongoDB**
- **Mongoose**

### Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Get all books (with filters) |
| GET | `/books/:id` | Get book by ID |
| POST | `/books` | Create new book |
| PUT | `/books/:id` | Update book |
| DELETE | `/books/:id` | Delete book |

### Query Parameters

**GET /books** supports:
- `search` - Search by title or author (case-insensitive)
- `genre` - Filter by genre
- `publishedYear` - Filter by year
- `available` - Filter by availability (true/false)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `order` - Sort order: asc/desc (default: desc)

### Request Examples

**Create a book**
```bash
POST /api/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565",
  "publishedYear": 1925,
  "genre": "Fiction",
  "available": true
}
```

**Get all books with filters**
```bash
GET /api/books?genre=Fiction&available=true&page=1&limit=10&sortBy=title&order=asc
```

**Search books**
```bash
GET /api/books?search=gatsby
```

**Update a book**
```bash
PUT /api/books/:id
Content-Type: application/json

{
  "available": false
}
```

**Delete a book**
```bash
DELETE /api/books/:id
```

## Response Format

**Success Response**
```json
{
  "books": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

**Error Response**
```json
{
  "status": "error",
  "message": "Error description"
}
```

## Project Structure

```
src/
├── controllers/        # Request handlers
│   └── book.controller.ts
├── services/          # Business logic
│   └── book.service.ts
├── models/            # Database schemas
│   └── book.model.ts
├── routes/            # API routes
│   └── book.routes.ts
├── middlewares/       # Custom middleware
│   ├── validation.middleware.ts
│   └── error.middleware.ts
├── utils/             # Utilities
│   ├── book.interface.ts
│   ├── route.interface.ts
│   └── errors.ts
├── app.ts            # Express app setup
└── server.ts         # Entry point
```

## Book Schema

```typescript
{
  title: string          // Required
  author: string         // Required
  isbn: string          // Required, unique
  publishedYear: number // Required
  genre: string         // Required
  available: boolean    // Default: true
  createdAt: Date       // Auto-generated
  updatedAt: Date       // Auto-generated
}
```
