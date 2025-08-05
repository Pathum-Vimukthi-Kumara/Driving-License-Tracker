// This file adapts the Express app for serverless use in Vercel
const app = require('./index');

// Export a function suitable for serverless environments
module.exports = async (req, res) => {
  // Forward the request to the Express app
  return app(req, res);
};
