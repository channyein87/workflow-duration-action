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

  core.info(`owner: ${owner}`);
  core.info(`repo: ${repo}`);
  core.info(`runId: ${runId}`);

  try {

    const octokit = github.getOctokit(token)

    const data = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}', {
      owner,
      repo,
      run_id: runId
    })

    const created_at = data.data.created_at;
    const updated_at = data.data.updated_at;

    // core.debug(`data: ${JSON.stringify(data.data, undefined, 2)}`);
    core.info(`create_at: ${created_at}`);
    core.info(`update_at: ${updated_at}`);

    const created_timestamp = new Date(created_at).getTime() / 1000;
    const updated_timestamp = new Date(updated_at).getTime() / 1000;
    core.debug(`created_timestamp: ${created_timestamp}`);
    core.debug(`updated_timestamp: ${updated_timestamp}`);

    const diff = updated_timestamp - created_timestamp;
    core.info(`diff: ${diff}`);

    return diff;

  } catch (error) {
    throw new Error("Failed to get from parent workflow run")
  }
}

module.exports = duration;
