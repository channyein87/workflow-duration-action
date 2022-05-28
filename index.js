const core = require('@actions/core')
// const github = require('@actions/github')
const duration = require('./duration.js')

// action
async function run() {
  try {

    const token = core.getInput('github_token', { required: true })
    let [owner, repo] = core.getInput('repository').split("/")
    // const workflow = core.getInput('workflow');
    let runId = core.getInput('run_id');

      // const client = github.getOctokit(token)

      // if (!runId) {

      //   if (!workflow) {
      //     core.warning('either workflow or run_id is required')
      //     process.exit(1)
      //   }

      //   let runs = await client.actions.listWorkflowRuns({
      //     owner: owner,
      //     repo: repo,
      //     workflow_id: workflow
      //   })
      //     for (const run of runs.data) {
      //       runId = run.id
      //       break
      //     }
      
      //   if (runId) {
      //     core.info(`runId: ${runId}`)
      //   } else {
      //     throw new Error("no matching workflow run found")
      //   }
      // }

      // const durationTime = await duration(owner, repo, runId, token);

      // core.info(`duration: ${durationTime}`);
      // core.setOutput("duration", durationTime);
    // }

    const durationTime = await duration(owner, repo, runId, token);

    core.info(`duration: ${durationTime}`);
    core.setOutput("duration", durationTime);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run().catch(error => core.setFailed(error.message));
