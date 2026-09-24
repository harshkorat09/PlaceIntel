import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/server.js';

describe('API Foundation', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ service: 'placeintel-api', status: 'ok' });
  });

  it('should reject unauthenticated access to protected routes', async () => {
    const res = await request(app).get('/api/placements');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('should return 400 for invalid body on login', async () => {
    const res = await request(app).post('/api/login').send({ email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});
