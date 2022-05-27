const core = require('@actions/core');
const github = require('@actions/github')
const duration = require('./duration');

// action
async function run() {
  try {

    const workflowUrl = getGithubInput();

    core.info(`Workflow url is ${workflowUrl}`);

    core.debug((new Date()).toTimeString());
    await duration(workflowUrl);
    core.info((new Date()).toTimeString());

    core.setOutput('duration', duration);
  } catch (error) {
    core.setFailed(error.message);
  }
}

function getGithubInput() {
  let input
  input = core.getInput('url');
  if (input === 'true') return input;
  if (input === 'false')
    input = github.context.payload.event.workflow_run.url
    return input;
}

run();
