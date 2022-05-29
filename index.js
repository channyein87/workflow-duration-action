const core = require('@actions/core');
const duration = require('./duration.js');

// action
async function run() {
  try {

    const token = core.getInput('github_token', { required: true })
    let [owner, repo] = core.getInput('repository').split("/")
    const workflow = core.getInput('workflow');
    let runId = core.getInput('run_id');

    core.info(`workflow: ${workflow}`);

    const durationTime = await duration(owner, repo, workflow, runId, token);

    core.info(`duration: ${durationTime} seconds`);
    core.setOutput("duration", durationTime);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run().catch(error => core.setFailed(error.message));
