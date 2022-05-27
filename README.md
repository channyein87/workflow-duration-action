# Workflow Duration Action

<p align="left">
  <a href="https://github.com/actions/javascript-action/actions"><img alt="javscript-action status" src="https://github.com/actions/javascript-action/workflows/units-test/badge.svg"></a>
</p>

Action to get the duration seconds of the workflow.:alarm_clock:

This action calculate duration between `created_at` and `updated_at` of the [workflow run](https://docs.github.com/en/rest/actions/workflow-runs#get-a-workflow-run).

## Usage

The actions is used either the `url` input by user or pick the `${{ github.event.workflow_run.url }}` automactically when using in the `workflow_run`.
