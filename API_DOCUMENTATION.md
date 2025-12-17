# API Documentation

This document provides details about the RESTful API endpoints for the AI Decision Justification Tracker.

## Authentication

All API endpoints (except user registration and login) require authentication via JWT tokens.

### Register a New User

**POST** `/api/users/register`

Registers a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "string",
    "email": "string"
  }
}
```

### Login User

**POST** `/api/users/login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "string",
    "email": "string"
  }
}
```

## Decisions

All decision endpoints require authentication.

### Create a New Decision

**POST** `/api/decisions`

Creates a new decision record.

**Request Body:**
```json
{
  "title": "string",
  "context": "string",
  "reasoning": "string",
  "assumptions": ["string"],
  "expectedOutcome": "string"
}
```

**Response:**
```json
{
  "_id": "decision_id",
  "userId": "user_id",
  "title": "string",
  "context": "string",
  "reasoning": "string",
  "assumptions": ["string"],
  "expectedOutcome": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Get All Decisions

**GET** `/api/decisions`

Retrieves all decisions for the authenticated user.

**Query Parameters:**
- `analyzed` (optional): Filter by analysis status (`true` or `false`)

**Response:**
```json
[
  {
    "_id": "decision_id",
    "userId": "user_id",
    "title": "string",
    "context": "string",
    "reasoning": "string",
    "assumptions": ["string"],
    "expectedOutcome": "string",
    "actualOutcome": "string",
    "successLevel": 1-5,
    "unexpectedFactors": ["string"],
    "aiAnalysis": {
      "comparison": "string",
      "invalidAssumptions": ["string"],
      "lessonsLearned": ["string"],
      "suggestions": ["string"]
    },
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
]
```

### Get a Specific Decision

**GET** `/api/decisions/:id`

Retrieves a specific decision by ID.

**Response:**
```json
{
  "_id": "decision_id",
  "userId": "user_id",
  "title": "string",
  "context": "string",
  "reasoning": "string",
  "assumptions": ["string"],
  "expectedOutcome": "string",
  "actualOutcome": "string",
  "successLevel": 1-5,
  "unexpectedFactors": ["string"],
  "aiAnalysis": {
    "comparison": "string",
    "invalidAssumptions": ["string"],
    "lessonsLearned": ["string"],
    "suggestions": ["string"]
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Update Decision with Actual Outcome

**PUT** `/api/decisions/:id/outcome`

Updates a decision with the actual outcome and triggers AI analysis.

**Request Body:**
```json
{
  "actualOutcome": "string",
  "successLevel": 1-5,
  "unexpectedFactors": ["string"]
}
```

**Response:**
```json
{
  "_id": "decision_id",
  "userId": "user_id",
  "title": "string",
  "context": "string",
  "reasoning": "string",
  "assumptions": ["string"],
  "expectedOutcome": "string",
  "actualOutcome": "string",
  "successLevel": 1-5,
  "unexpectedFactors": ["string"],
  "aiAnalysis": {
    "comparison": "string",
    "invalidAssumptions": ["string"],
    "lessonsLearned": ["string"],
    "suggestions": ["string"]
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Trigger AI Analysis

**POST** `/api/decisions/:id/analyze`

Manually triggers AI analysis for a decision.

**Response:**
```json
{
  "message": "AI analysis completed successfully",
  "analysis": {
    "comparison": "string",
    "invalidAssumptions": ["string"],
    "lessonsLearned": ["string"],
    "suggestions": ["string"]
  }
}
```

### Delete a Decision

**DELETE** `/api/decisions/:id`

Deletes a decision record.

**Response:**
```json
{
  "message": "Decision deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request**
```json
{
  "message": "Error description",
  "errors": ["array of validation errors (if applicable)"]
}
```

**401 Unauthorized**
```json
{
  "message": "Access denied. No token provided."
}
```

or

```json
{
  "message": "Invalid token."
}
```

**404 Not Found**
```json
{
  "message": "Decision not found"
}
```

**500 Internal Server Error**
```json
{
  "message": "Server error",
  "error": "error details"
}
```