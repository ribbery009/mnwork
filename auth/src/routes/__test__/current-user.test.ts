import request from 'supertest';
import { app } from '../../app';


it('a válasz null, ha nem volt autentikáció', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
