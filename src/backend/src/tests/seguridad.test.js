const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const env = require('../config/env');

const tokenDe = (rol) => jwt.sign({ id: 1, rol }, env.jwtSecret);

describe('seguridad de la API', () => {
  test('CP-AUT-07: sin token responde 401', async () => {
    expect((await request(app).get('/api/cursos/oferta')).status).toBe(401);
  });
  test('CP-AUT-07: token inválido responde 401', async () => {
    const r = await request(app).get('/api/cursos/oferta').set('Authorization', 'Bearer falso');
    expect(r.status).toBe(401);
  });
  test('CP-AUT-05: estudiante no puede crear secciones (403)', async () => {
    const r = await request(app).post('/api/cursos/secciones').set('Authorization', `Bearer ${tokenDe('ESTUDIANTE')}`);
    expect(r.status).toBe(403);
  });
  test('estudiante autenticado ve la oferta (200)', async () => {
    const r = await request(app).get('/api/cursos/oferta').set('Authorization', `Bearer ${tokenDe('ESTUDIANTE')}`);
    expect(r.status).toBe(200);
  });
  test('salud de la API', async () => {
    expect((await request(app).get('/api/salud')).body).toEqual({ estado: 'ok' });
  });
});
