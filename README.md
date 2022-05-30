# Workflow Duration Action

[![units-test](https://github.com/channyein87/workflow-duration-action/actions/workflows/test.yml/badge.svg)](https://github.com/channyein87/workflow-duration-action/actions/workflows/test.yml)

Action to get the duration seconds of the workflow.:alarm_clock:

This action outputs duration of the workflow in seconds, milliseconds, minutes and hours.

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

    # Specific workflow instead of parent workflow run
    # For example, build.yaml
    # Default: null
    workflow: ''

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
  workflow_duration:
    runs-on: ubuntu-latest
    steps:
      - name: Workflow run duration action
        uses: channyein87/workflow-duration-action@v1
        id: duration
      - name: Get the output of duration
        run: echo "The units-test workflow is ${{ steps.duration.outputs.duration }} seconds long."
```

### Run with specific workflows

```yaml
jobs:
  workflow_durations:
    runs-on: ubuntu-latest
    steps:
      - name: Test workflow duration
        uses: channyein87/workflow-duration-action@v1
        id: test
        with:
          repository: actions/checkout
          workflow: test.yml
          github_token: ${{ secrets.GITHUB_TOKEN }}
      - name: Check dist workflow duration
        uses: channyein87/workflow-duration-action@v1
        id: check-dist
        with:
          repository: actions/checkout
          workflow: check-dist.yml
          github_token: ${{ secrets.GITHUB_TOKEN }}
      - name: Get the output of duration
        run: |
          echo "The test workflow is ${{ steps.test.outputs.duration }} long."
          echo "The check dist workflow is ${{ steps.check-dist.outputs.duration }} long."
```

## Outputs

### `duration`

Duration of the workflow in general.

### `seconds`

Duration of the workflow in seconds.

### `milliseconds`

Duration of the workflow in milliseconds.

### `minutes`

Duration of the workflow in minutes.

### `hours`

Duration of the workflow in hours.

### Sample outputs

```text
duration: 6m 51s
seconds: 411
milliseconds: 411000
minutes: 6.85
hours: 0.11
```
