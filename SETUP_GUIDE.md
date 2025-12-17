# Setup Guide

This guide provides step-by-step instructions for setting up and running the AI Decision Justification Tracker application.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm (usually comes with Node.js)
- MongoDB (local installation or cloud instance like MongoDB Atlas)
- Git (optional, for version control)

## Project Structure

The application consists of two main parts:
1. **Backend**: Node.js + Express.js API
2. **Frontend**: Angular single-page application

```
ai-decision-tracker/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   ├── angular.json
│   └── package.json
├── README.md
├── AI_PROMPT_DESIGN.md
└── API_DOCUMENTATION.md
```

## Backend Setup

### 1. Clone or Download the Repository

If you haven't already, clone or download the project files to your local machine.

### 2. Navigate to the Project Root

Open your terminal or command prompt and navigate to the project root directory:
```bash
cd path/to/ai-decision-tracker
```

### 3. Install Backend Dependencies

Install the required Node.js packages:
```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root directory with the following content:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-decision-tracker
JWT_SECRET=your_jwt_secret_key_here
AI_API_KEY=your_openai_api_key_here
```

Replace the placeholder values with your actual configuration:
- `PORT`: The port on which the backend server will run (5000 is recommended)
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secret key for JWT token generation (use a strong, random string)
- `AI_API_KEY`: Your OpenAI API key for AI analysis features

### 5. Set Up MongoDB

Ensure MongoDB is running on your system. If you're using a local installation:
- Start MongoDB service
- The application will automatically create the `ai-decision-tracker` database

If you're using MongoDB Atlas or another cloud provider:
- Update the `MONGODB_URI` in your `.env` file with your connection string

### 6. Start the Backend Server

Run the backend server in development mode:
```bash
npm run dev
```

The server should start on `http://localhost:5000`. You should see a message indicating successful MongoDB connection.

## Frontend Setup

### 1. Navigate to the Frontend Directory

Open a new terminal window and navigate to the frontend directory:
```bash
cd path/to/ai-decision-tracker/frontend
```

### 2. Install Frontend Dependencies

Install the required Angular packages:
```bash
npm install
```

### 3. Start the Development Server

Start the Angular development server:
```bash
npm start
```

The frontend should start on `http://localhost:4200`.

## Testing the Application

### 1. Access the Application

Open your web browser and navigate to `http://localhost:4200`.

### 2. Register a New User

Click on the "Register" link and create a new account.

### 3. Log In

Use your newly created credentials to log in to the application.

### 4. Create a Decision

Navigate to the "Create New Decision" page and fill out the form with:
- Decision title
- Context/description
- Reasoning behind the decision
- Assumptions (add as many as needed)
- Expected outcome

### 5. Record Actual Outcome

After some time has passed and you know the actual result:
- Go to the decision detail page
- Click "Record Actual Outcome"
- Fill in what actually happened
- Rate the success level (1-5)
- Add any unexpected factors
- Save the outcome

### 6. View AI Analysis

Once you've recorded the actual outcome, the AI analysis will be automatically triggered. You can view the results on the decision detail page, which will show:
- Comparison analysis
- Invalid assumptions identified
- Lessons learned
- Suggestions for future decisions

## Troubleshooting

### Common Issues

1. **Port already in use**: If you see an error about the port being in use, change the `PORT` value in your `.env` file to a different port number.

2. **MongoDB connection error**: Ensure MongoDB is running and your connection string is correct.

3. **AI analysis not working**: Verify your OpenAI API key is correct and has sufficient credits.

4. **Frontend not connecting to backend**: Ensure the backend server is running on `http://localhost:5000`.

### Getting Help

If you encounter issues not covered in this guide:
1. Check the browser console and terminal output for error messages
2. Verify all environment variables are correctly set
3. Ensure all dependencies are properly installed
4. Check that MongoDB is running and accessible

## Development Notes

### Backend Development

The backend uses:
- Express.js for the web framework
- Mongoose for MongoDB object modeling
- JWT for authentication
- Axios for HTTP requests to the AI service

Key files to modify for feature development:
- `models/`: Database schemas
- `routes/`: API endpoint definitions
- `controllers/`: Business logic
- `services/`: External service integrations (AI)

### Frontend Development

The frontend uses:
- Angular 17 with standalone components
- Reactive forms for data handling
- RxJS for state management

Key files to modify for feature development:
- `src/app/components/`: UI components
- `src/app/services/`: API service integrations
- `src/app/models/`: Data models
- `src/app/app.routes.ts`: Navigation routes

## Deployment

For production deployment:

### Backend
1. Set `NODE_ENV=production` in your environment variables
2. Use a process manager like PM2 to run the application
3. Configure a reverse proxy (nginx, Apache) to serve the API

### Frontend
1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```
2. Serve the generated files in the `dist/` directory using a web server

### Database
1. Use a production MongoDB instance (MongoDB Atlas recommended)
2. Configure appropriate security settings and backups

## Contributing

This project is designed for educational purposes. Feel free to:
1. Fork the repository
2. Make improvements
3. Submit pull requests
4. Report issues

## License

This project is licensed under the MIT License.