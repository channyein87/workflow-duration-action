const core = require('@actions/core');
const github = require('@actions/github');

async function duration(owner, repo, workflow, runId, token) {

  core.info(`owner: ${owner}`);
  core.info(`repo: ${repo}`);

  try {

    const octokit = github.getOctokit(token)

    // find run id if there is workflow input
    if (workflow) {

      core.info(`custom workflo input: ${workflow}`);

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

    const run_duration = run_duration_ms / 1000;
    core.debug(`run_duration: ${run_duration}`);

    return run_duration;

  } catch (error) {
    throw new Error("Failed to get from parent workflow run")
  }
}

module.exports = duration;
