const core = require('@actions/core');
const duration = require('./duration.js');

// action
async function run() {
  try {

    const token = core.getInput('github_token', { required: true })
    let [owner, repo] = core.getInput('repository').split("/")
    const workflow = core.getInput('workflow');
    let runId = core.getInput('run_id');

    const durationTime = await duration(owner, repo, workflow, runId, token);

    core.info(`duration: ${durationTime.run_duration} seconds`);
    core.info(`milliseconds: ${durationTime.run_duration_ms}`);
    core.info(`minutes: ${durationTime.run_duration_minutes}`);
    core.info(`hours: ${durationTime.run_duration_hours}`);

    core.setOutput("duration", durationTime.run_duration);
    core.setOutput("seconds", durationTime.run_duration);
    core.setOutput("milliseconds", durationTime.run_duration_ms);
    core.setOutput("minutes", durationTime.run_duration_minutes);
    core.setOutput("hours", durationTime.run_duration_hours);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run().catch(error => core.setFailed(error.message));
