import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
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
      password: '12345'
    })
    .expect(200);

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  expect(response.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
