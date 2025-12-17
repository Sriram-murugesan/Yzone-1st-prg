# How to Run the AI Decision Justification Tracker

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- OpenAI API key

## Running the Application

### 1. Start the Backend Server

1. Open a terminal/command prompt
2. Navigate to the project root directory:
   ```
   cd "c:\Users\Dheeban Raj.j\Downloads\Yzone 1st prg"
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ai-decision-tracker
   JWT_SECRET=your_jwt_secret_key_here
   AI_API_KEY=your_openai_api_key_here
   ```
5. Start the server:
   ```
   node server.js
   ```

The backend server will start on `http://localhost:5000`

### 2. Test the API

You can test the API by opening the `test-api.html` file in your browser and clicking the "Test API Connection" button.

### 3. Start the Frontend (Angular)

1. Open a new terminal/command prompt
2. Navigate to the frontend directory:
   ```
   cd "c:\Users\Dheeban Raj.j\Downloads\Yzone 1st prg\frontend"
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npx ng serve
   ```

The frontend will start on `http://localhost:4200`

### 4. Using the Application

1. Open your browser and navigate to `http://localhost:4200`
2. Register a new user account
3. Log in with your credentials
4. Create decisions with context, reasoning, and expected outcomes
5. Later, record actual outcomes to trigger AI analysis
6. Review AI-generated insights on decision detail pages

## Troubleshooting

### Backend Issues
- If port 5000 is already in use, change the PORT in `.env` to a different port
- Ensure MongoDB is running and accessible
- Verify your OpenAI API key is valid and has sufficient credits

### Frontend Issues
- If Angular CLI commands don't work, try installing Angular CLI globally:
  ```
  npm install -g @angular/cli
  ```
- Then run:
  ```
  ng serve
  ```

## API Endpoints

- `GET http://localhost:5000/` - API root
- `POST http://localhost:5000/api/users/register` - User registration
- `POST http://localhost:5000/api/users/login` - User login
- `POST http://localhost:5000/api/decisions` - Create decision
- `GET http://localhost:5000/api/decisions` - Get all decisions
- `GET http://localhost:5000/api/decisions/:id` - Get specific decision
- `PUT http://localhost:5000/api/decisions/:id/outcome` - Update with outcome
- `POST http://localhost:5000/api/decisions/:id/analyze` - Trigger AI analysis

## File Structure

```
ai-decision-tracker/
├── server.js (Backend server)
├── models/ (Database models)
├── routes/ (API routes)
├── controllers/ (Business logic)
├── services/ (External services)
├── frontend/ (Angular frontend)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── models/
│   │   └── index.html
│   └── package.json
├── .env (Environment variables)
└── package.json (Backend dependencies)
```