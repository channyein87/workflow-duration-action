const duration = require('./duration');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('throws invalid run id', async () => {
  // check run id is integer
  const runId = 123456;
  expect(() => duration('channyein87','workflow-duration-action','foo')).toThrow('Invalid run id');
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_OWNER'] = 'channyein87';
  process.env['INPUT_REPO'] = 'workflow-duration-action';
  process.env['INPUT_RUN_ID'] = 2395414061;
  const ip = path.join(__dirname, 'index.js');
  const result = cp.execSync(`node ${ip}`, {env: process.env}).toString();
  console.log(result);
})
