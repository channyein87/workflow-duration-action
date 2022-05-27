const core = require('@actions/core');
const duration = require('./duration');

// action
async function run() {
  try {

    const owner = core.getInput('owner');
    const repo = core.getInput('repo');
    const runId = core.getInput('run_id');

    core.info(`Owner is ${owner}`);
    core.info(`Owner is ${repo}`);
    core.info(`Owner is ${runId}`);

    core.debug((new Date()).toTimeString());
    await duration(workflowUrl);
    core.info((new Date()).toTimeString());

    core.setOutput('duration', duration);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
