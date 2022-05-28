# Workflow Duration Action

[![units-test](https://github.com/channyein87/workflow-duration-action/actions/workflows/test.yml/badge.svg)](https://github.com/channyein87/workflow-duration-action/actions/workflows/test.yml)

Action to get the duration seconds of the workflow.:alarm_clock:

This action calculate duration between `created_at` and `updated_at` of the [workflow run](https://docs.github.com/en/rest/actions/workflow-runs#get-a-workflow-run).

## Usage

The actions isn't required user inputs if it is run in `workflow_run` mode.

```yaml
- uses: channyein87/workflow-duration-action@v1
  with:
    # Repository owner. For example, channyein87/workflow-duration-action
    # Default: ${{ github.event.workflow_run.head_repository.full_name }}
    repository: ''

    # Individal run id of the github actions workflow
    #
    # Normally it shows on the url
    # For example, https://github.com/octokit/action/actions/runs/123
    # where 123 is the run id
    #
    # Default: ${{ github.event.workflow_run.id }}
    run_id: ''

    # Personal access token (PAT) used to fetch the repository.
    # Default: ${{ github.token }}
    github_token: ''
```

### Run in Workflow Run mode

```yaml
on:
  workflow_run:
    types: [ "completed" ]
    workflows: [ "units-test" ]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    steps:
      - name: Workflow run duration action
        uses: channyein87/workflow-duration-action@v1
        id: duration
      - name: Get the output of duration
        run: echo "The duration is ${{ steps.duration.outputs.duration }} seconds long."
```

## Outputs

### `duration`

Duration of the workflow in seconds.
