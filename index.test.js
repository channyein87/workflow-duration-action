const duration = require('./duration');

test('throws invalid url', async () => {
  // check valid url
  const url = 'foo';
  expect(() => duration(url)).toThrow('Invalid url');
});
