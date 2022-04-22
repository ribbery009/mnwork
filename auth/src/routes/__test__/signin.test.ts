import request from 'supertest';
import { app } from '../../app';

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'teszt@teszt.com',
      password: '12345'
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
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
    .post('/api/users/signin')
    .send({
      email: 'teszt@teszt.com',
      password: '1234'
    })
    .expect(400);
});

it('valid bejelentkezés után van Cookie', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'teszt23@teszt.com',
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

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'teszt23@teszt.com',
      password: '12345'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
