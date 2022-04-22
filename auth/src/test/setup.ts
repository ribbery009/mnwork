import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri,);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = 'teszt@teszt.com';
  const password = '12345';

  await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password
    })
    .expect(201);


  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'teszt@teszt.com',
      password: '12345'
    })
    .expect(200);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
