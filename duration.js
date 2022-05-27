const core = require('@actions/core');
const github = require('@actions/github');

async function duration(owner, repo, runId, token) {

  // check token or run id is missing
  if (!token) {
    throw new Error('Token is required');
  }

  // check run id is missing
  if (!runId) {
    throw new Error('Run id is required');
  }

  const octokit = new github.GitHub(token);

  core.info(`owner: ${owner}`);
  core.info(`repo: ${repo}`);
  core.info(`runId: ${runId}`);

  let create_at = null;
  let update_at = null;
  try {

    data = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}', {
      owner,
      repo,
      runId,
    });

    create_at = JSON.stringify(data.data.create_at, null, 2);
    update_at = JSON.stringify(data.data.updated_at, null, 2);

    core.info(`create_at: ${create_at}`);
    core.info(`update_at: ${update_at}`);

    let create_at_date = new Date(create_at);
    let update_at_date = new Date(update_at);
    let diff = update_at_date.getTime() - create_at_date.getTime();
    core.info(`diff: ${diff}`);

    return diff;

  } catch (error) {
    throw new Error("Failed to get from parent workflow run")
  }
}

module.exports = duration;
