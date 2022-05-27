const core = require('@actions/core');
const request = require('request');

let duration = function (url) {
  if (!validURL(url)) {
    throw new Error('Invalid url');
  }
  return new Promise((resolve) => {

    let token = getGithubToken();
    let workflowRun = getWorkflowRun(token, url);

    console.log(workflowRun)
    // let start = workflowRun.created_at;
    // let end = workflowRun.updated_at;
    // let diff = end.getTime() - start.getTime();
    let diff = 123;
    resolve(diff);
  });
};

// validate url
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

// get github token
function getGithubToken() {
  let token = core.getInput('token');
  if (token === 'true') return token;
  if (token === 'false')
    token = process.env.GITHUB_TOKEN;
  return token;
}

// get workflow run by id
function getWorkflowRun(token, url) {
  return new Promise((resolve) => {
    request({
      url: url,
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'request'
      }
    }, function (error, response, body) {
      if (error) {
        console.log(error);
        throw new Error(error);
      }
      resolve(JSON.stringify(JSON.parse(body)));
    });
  });
}

module.exports = duration;
