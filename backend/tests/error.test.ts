import app from '../src/app';
import { HTTP_STATUS } from '../src/constants/http-status';
import request from 'supertest';

describe('Error Handling Middleware', () => {
  it('should return 404 for undefined routes', async () => {
    const response = await request(app).get('/undefined-route');

    expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Route not found',
    });
  });
});
