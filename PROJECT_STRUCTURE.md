# Project Structure

This document provides an overview of the file and directory structure for the AI Decision Justification Tracker application.

## Root Directory

```
ai-decision-tracker/
├── backend/
├── frontend/
├── .env
├── .gitignore
├── package.json
├── server.js
├── README.md
├── AI_PROMPT_DESIGN.md
├── API_DOCUMENTATION.md
└── SETUP_GUIDE.md
```

## Backend Structure

```
backend/
├── controllers/
│   └── decisionController.js
├── models/
│   ├── Decision.js
│   └── User.js
├── routes/
│   ├── decisions.js
│   └── users.js
├── services/
│   └── aiService.js
├── .env
├── package.json
└── server.js
```

### Models

- **User.js**: Defines the user schema with username, email, and password fields. Includes password hashing functionality.
- **Decision.js**: Defines the decision schema with fields for title, context, reasoning, assumptions, expected outcome, actual outcome, and AI analysis results.

### Routes

- **users.js**: Handles user registration and authentication endpoints.
- **decisions.js**: Manages all decision-related endpoints including creation, retrieval, updating with outcomes, and deletion.

### Controllers

- **decisionController.js**: Contains business logic for decision operations including AI analysis triggering and decision retrieval with filtering.

### Services

- **aiService.js**: Integrates with the OpenAI API to perform retrospective decision analysis. Constructs structured prompts and parses AI responses.

## Frontend Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   └── dashboard.component.ts
│   │   │   ├── decision-detail/
│   │   │   │   └── decision-detail.component.ts
│   │   │   ├── decision-form/
│   │   │   │   └── decision-form.component.ts
│   │   │   ├── login/
│   │   │   │   └── login.component.ts
│   │   │   ├── outcome-form/
│   │   │   │   └── outcome-form.component.ts
│   │   │   └── register/
│   │   │       └── register.component.ts
│   │   ├── models/
│   │   │   └── decision.model.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── decision.service.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
└── README.md
```

### Components

- **Login Component**: Provides user authentication interface.
- **Register Component**: Handles new user registration.
- **Dashboard Component**: Displays decision statistics and recent decisions.
- **Decision Form Component**: Allows users to create new decisions.
- **Outcome Form Component**: Enables recording of actual outcomes for decisions.
- **Decision Detail Component**: Shows detailed information about a decision including AI analysis.

### Models

- **decision.model.ts**: Defines TypeScript interfaces for Decision and User data structures.

### Services

- **auth.service.ts**: Manages user authentication state and API calls.
- **decision.service.ts**: Handles all decision-related API interactions.

### Core Files

- **app.component.ts**: Main application component with navigation.
- **app.config.ts**: Application configuration including HTTP client provider.
- **app.routes.ts**: Route definitions for the application.
- **main.ts**: Application entry point.

## Documentation Files

- **README.md**: Project overview, features, and setup instructions.
- **AI_PROMPT_DESIGN.md**: Detailed explanation of the AI prompt engineering approach.
- **API_DOCUMENTATION.md**: Comprehensive documentation of all API endpoints.
- **SETUP_GUIDE.md**: Step-by-step installation and configuration guide.

## Configuration Files

- **.env**: Environment variables for configuration (not included in repository).
- **package.json**: Backend dependencies and scripts.
- **angular.json**: Angular CLI configuration.
- **tsconfig.json**: TypeScript compiler configuration.
- **tsconfig.app.json**: TypeScript configuration for the application.

This structure promotes modularity, scalability, and maintainability while separating concerns between frontend and backend components.