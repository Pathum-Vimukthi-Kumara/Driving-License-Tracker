// This file adapts the Express app for serverless use in Vercel
const app = require('./index');
const serverless = require('serverless-http');

// Create a serverless handler from our Express app with configuration
const handler = serverless(app, {
  provider: {
    // Vercel uses AWS Lambda under the hood
    type: 'aws'
  },
  basePath: '',  // No base path needed for Vercel
  requestId: {
    // Extract request ID from Vercel headers if available
    header: 'x-vercel-id'
  }
});

// Export the serverless handler
module.exports = async (req, res) => {
  try {
    console.log(`[Serverless] ${req.method} ${req.url}`);
    
    // Log important headers for debugging
    console.log('[Serverless] Headers:', {
      'content-type': req.headers['content-type'],
      'user-agent': req.headers['user-agent'],
      'x-forwarded-for': req.headers['x-forwarded-for'],
      'x-vercel-id': req.headers['x-vercel-id']
    });
    
    // Forward the request to the serverless handler
    const result = await handler(req, res);
    return result;
  } catch (error) {
    console.error('[Serverless] Handler error:', error);
    
    // Only send response if it hasn't been sent already
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Server error', 
        message: error.message || 'Unknown server error',
        path: req.url,
        time: new Date().toISOString()
      });
    }
  }
};
