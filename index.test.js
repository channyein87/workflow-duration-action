const duration = require('./duration')
const process = require('process')
const cp = require('child_process')
const path = require('path')

// test failure
test('test invalid request', async () => {
    expect(() => duration('channyein87', 'workflow-duration-action', null, 123, 'ghp_123')).rejects.toThrow('Failed to get from parent workflow run');
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    const env = {
        ...process.env,
        'INPUT_REPOSITORY': 'channyein87/workflow-duration-action',
        'INPUT_RUN_ID': 2397069640,
        'INPUT_GITHUB_TOKEN': process.env.GITHUB_TOKEN
    };
    const ip = path.join(__dirname, 'index.js');
    console.log(cp.execFileSync('node', [ip], { env }).toString());
})

test('test run specific workflow', () => {
    const env = {
        ...process.env,
        'INPUT_REPOSITORY': 'channyein87/workflow-duration-action',
        'INPUT_RUN_ID': 2397069640,
        'INPUT_WORKFLOW': 'workflow-run.yml',
        'INPUT_GITHUB_TOKEN': process.env.GITHUB_TOKEN
    };
    const ip = path.join(__dirname, 'index.js');
    console.log(cp.execFileSync('node', [ip], { env }).toString());
})
