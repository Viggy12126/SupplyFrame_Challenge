const request = require('supertest');
const app = require('../index'); // Path to your Express app file


test('GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
} )

test('POST /search', async () => {
    const response = await request(app)
      .post('/search')
      .send({ search: 'Batata Kanda Poha' }); // Assuming 'search' is the parameter expected by the route handler
    expect(response.statusCode).toBe(200);
  
});
