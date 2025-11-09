function soma(a, b) {
  return a + b;
}

test('soma 2 + 3 deve ser igual a 5', () => {
  expect(soma(2, 3)).toBe(5);
});
