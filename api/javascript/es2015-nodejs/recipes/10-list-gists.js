/**
 * Lists gist on GitHub
 * node recipes/10-list-gists.js
 * Author Charlie Calvert
 */

const GitHubClient = require('../libs/GitHubClient.js').GitHubClient;
const listgists = require('../libs/features/listgists');


/* let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHITHUB_ENTERPRISE
}, octocat); */

// await octokit.request('GET /gists')

let githubCli = new GitHubClient({
  baseUri:"https://api.github.com",
  token: process.env.TOKEN_GITHUB_DOT_COM
}, listgists);

githubCli
  .fetchGists({ handle: "charliecalvert" })
  .then(data => {
    console.log(data.length);
    for (const item of data) {
      console.log(item.id, item.owner.login);
    }
  })
  .catch(error => {
    console.log("error", error)
  });

