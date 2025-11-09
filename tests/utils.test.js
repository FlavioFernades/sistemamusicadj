// tests/utils.test.js
const { verificarToken } = require('../public/js/utils');

test('deve retornar false quando o token não existe', () => {
  expect(verificarToken(null)).toBe(false);
});

test('deve retornar true quando o token é válido', () => {
  expect(verificarToken('abc123')).toBe(true);
});
