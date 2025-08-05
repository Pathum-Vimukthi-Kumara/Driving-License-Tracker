# Driving License Tracker Backend

This is the backend for the Driving License Tracker application. It's designed to work both as a regular Node.js/Express application for local development and as a serverless application on Vercel.

## Local Development

To run the application locally:

```bash
# Install dependencies
npm install

# Start the development server with nodemon
npm run dev

# Or start without auto-reload
npm start
```

The server will run on http://localhost:5000 by default.

## Vercel Deployment

The application is configured to run as a serverless application on Vercel. The main entry point for serverless functions is in the `/api` directory.

To deploy to Vercel:

```bash
# Install Vercel CLI if you don't have it
npm install -g vercel

# Login to Vercel (if you haven't already)
vercel login

# Deploy to production
npm run deploy

# Or for development/preview deployment
vercel
```

## Project Structure

- `server.js`: Entry point for local development
- `api/index.js`: Entry point for Vercel serverless deployment
- `routes/`: API route handlers
- `middleware/`: Custom middleware
- `database/`: Database connection and queries
- `uploads/`: Directory for uploaded files
- `vercel.json`: Vercel deployment configuration

## Environment Variables

Make sure to set these environment variables in your .env file for local development and in Vercel project settings for deployment:

- `JWT_SECRET`: Secret key for JWT tokens
- `DB_HOST`: Database host
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `PORT`: Server port (default: 5000, only used in local development)
