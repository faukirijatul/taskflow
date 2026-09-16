import request from 'supertest';
import app from '../src/app';
import { HTTP_STATUS } from '../src/constants/http-status';

describe('GET /health', () => {
  it('should return 200 OK with status ok', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
  });
});
