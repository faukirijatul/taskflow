import request from 'supertest';
import app from '../src/app';
import { HTTP_STATUS } from '../src/constants/http-status';

describe('GET /api-docs', () => {
  it('should serve Swagger UI documentation', async () => {
    const response = await request(app).get('/api-docs/');

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.text).toContain('Swagger UI');
  });
});
