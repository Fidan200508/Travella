import request from 'supertest';
import app from '../src'; //Import the app object from index.js
import mongoose from 'mongoose';

let server;
beforeAll(async () => {
    server = app.listen(5000); 
});

describe('GET /', () => {
    test('should respond with 200 and contain title text', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Backend is running');
    });
});

afterAll(async () => {
    if (server) {
        await server.close(); 
    }
    
    await mongoose.connection.close();
});