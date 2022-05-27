const core = require('@actions/core');

let duration = function (owner, repo, runId) {
  return new Promise((resolve) => {

    // check run id is integer
    if (isNaN(runId)) {
      resolve('Invalid run id');
      return;
    }

    let token = getGithubToken();

    const workflowRun = getWorkflowRun();

    console.log(workflowRun)
    // let start = workflowRun.created_at;
    // let end = workflowRun.updated_at;
    // let diff = end.getTime() - start.getTime();
    let diff = 123;
    resolve(diff);
  });
};

// get github token
function getGithubToken() {
  let token = core.getInput('token');
  if (token === 'true') return token;
  if (token === 'false')
    token = process.env.GITHUB_TOKEN;
  return token;
}

// get workflow run
function getWorkflowRun() {
  const octokit = new core({
    auth: token
  })

  return octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}', {
    owner: owner,
    repo: repo,
    run_id: runId
  })
}

module.exports = duration;
