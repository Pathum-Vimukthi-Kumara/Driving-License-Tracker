const request = require('supertest');
const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use('/', authRoutes);

describe('Auth API', () => {
  it('should not register user with missing email', async () => {
    const res = await request(app)
      .post('/register')
      .send({ password: 'Password01G' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'netadmin@admin.com', password: 'wrongpass', userType: 'admin' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });
});
