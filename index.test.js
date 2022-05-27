const duration = require('./duration');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('throws invalid url', async () => {
  // check valid url
  const url = 'foo';
  expect(() => duration(url)).toThrow('Invalid url');
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_URL'] = 'https://api.github.com/repos/channyein87/workflow-duration-action/actions/runs/2395414061';
  const ip = path.join(__dirname, 'index.js');
  const result = cp.execSync(`node ${ip}`, {env: process.env}).toString();
  console.log(result);
})