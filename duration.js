const core = require('@actions/core');
const github = require('@actions/github');

async function duration(owner, repo, workflow, runId, token) {

  core.info(`owner: ${owner}`);
  core.info(`repo: ${repo}`);

  try {

    const octokit = github.getOctokit(token)

    // find run id if there is workflow input
    if (workflow) {

      core.info(`custom workflow input: ${workflow}`);

      let workflowData = await octokit.request('GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs', {
        owner,
        repo,
        workflow_id: workflow,
        per_page: 1
      })

      core.debug(`custom workflow data: ${JSON.stringify(workflowData.data)}`);

      runId = JSON.stringify(workflowData.data.workflow_runs[0].id);
    }

    core.info(`runId: ${runId}`);

    const data = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing', {
      owner,
      repo,
      run_id: runId
    })

    const run_duration_ms = data.data.run_duration_ms;

    core.debug(`data: ${JSON.stringify(data.data)}`);
    core.debug(`run_duration_ms: ${run_duration_ms}`);

    const run_duration = timeConversion(run_duration_ms);
    const run_duration_seconds = run_duration_ms / 1000;
    const run_duration_minutes = run_duration_seconds / 60;
    const run_duration_hours = run_duration_minutes / 60;

    core.debug(`run_duration_seconds: ${run_duration_seconds}`);
    core.debug(`run_duration_minutes: ${run_duration_minutes}`);
    core.debug(`run_duration_hours: ${run_duration_hours}`);

    return {
      'run_duration': run_duration,
      'run_duration_seconds': run_duration_seconds,
      'run_duration_ms': run_duration_ms,
      'run_duration_minutes': run_duration_minutes.toFixed(2),
      'run_duration_hours': run_duration_hours.toFixed(2)
    };

  } catch (error) {
    throw new Error("Failed to get from parent workflow run")
  }
}

function timeConversion(duration) {
  var portions = [];
  var msInHour = 1000 * 60 * 60;
  var hours = Math.trunc(duration / msInHour);
  if (hours > 0) {
      portions.push(hours + 'h');
      duration = duration - (hours * msInHour);
  }
  var msInMinute = 1000 * 60;
  var minutes = Math.trunc(duration / msInMinute);
  if (minutes > 0) {
      portions.push(minutes + 'm');
      duration = duration - (minutes * msInMinute);
  }
  var seconds = Math.trunc(duration / 1000);
  if (seconds > 0) {
      portions.push(seconds + 's');
  }
  return portions.join(' ');
}

module.exports = duration;
