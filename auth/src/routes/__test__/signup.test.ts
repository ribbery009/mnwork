import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'teszt2@teszt2.com',
      password: '12345',
      name:'Kis Béla',
      rule:'boss',
      job_title:'manager',
      phone:'1111',
      city:'1234',
      address:'1234',
      postcode:'1234'
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'password'
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'p'
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'teszt@teszt.com'
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'alskjdf'
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'teszt@teszt.com',
      password: '12345',
      name:'Kis Béla',
      rule:'boss',
      job_title:'manager',
      phone:'1111',
      city:'1234',
      address:'1234',
      postcode:'1234'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'teszt@teszt.com',
      password: '12345',
      name:'Kis Béla',
      rule:'boss',
      job_title:'manager',
      phone:'1111',
      city:'1234',
      address:'1234',
      postcode:'1234'
    })
    .expect(400);
});

it('not sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'teszt@teszt.com',
      password: '12345',
      name:'Kis Béla',
      rule:'boss',
      job_title:'manager',
      phone:'1111',
      city:'1234',
      address:'1234',
      postcode:'1234'
    })
    .expect(201);

  expect(!response.get('Set-Cookie')).toBeDefined();
});
