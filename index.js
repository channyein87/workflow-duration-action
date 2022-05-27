const core = require('@actions/core');
const github = require('@actions/github')

// action
async function run() {
  try {

    const token = core.getInput("token", { required: true })
    const owner = core.getInput('owner');
    const repo = core.getInput('repo');
    const workflow = core.getInput('workflow');
    const runId = core.getInput('run_id');

    if (github.context.eventName == 'workflow_run') {

      const duration = await duration(
        github.context.repo.owner,
        github.context.repo.repo,
        github.context.payload.workflow_run.id,
        token
      );
      core.info(`duration: ${duration}`);
      core.setOutput("duration", duration);

    } else {

      const client = github.getOctokit(token)

      if ((!workflow) && (!runId)) {
        core.warning('either workflow or run_id is required')
        process.exit(0)
      }

      if (!runId) {
        for await (const runs of client.paginate.iterator(client.actions.listWorkflowRuns, {
          owner: owner,
          repo: repo,
          workflow_id: workflow,
          ...(branch ? { branch } : {}),
        }
        )) {
          for (const run of runs.data) {
            runId = run.id
            break
          }
          if (runId) {
            break
          }
        }

        const duration = await duration(owner, repo, runId, token);
        core.info(`duration: ${duration}`);
        core.setOutput("duration", duration);
      }
    }
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run().catch(error => core.setFailed(error.message));
