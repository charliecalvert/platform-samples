/*
# Users features

## Setup

```javascript
const GitHubClient = require('../libs/GitHubClient.js').GitHubClient;
const listgists = require('../libs/features/listgists');


let githubCli = new GitHubClient({
  baseUri: "http://github.at.home/api/v3",
  token: process.env.TOKEN_GHITHUB_ENTERPRISE
}, listgists); //<-- add gists features

let githubCli = new GitHubClient({
  baseUri:"https://api.github.com",
  token: process.env.TOKEN_GITHUB_DOT_COM
}, listgists);
```
*/

/*
## fetchGists

- parameter: `handle`
- return: `Promise`

### Description

`fetchGists` gets user gists (`handle`)
For example: users/charliecalvert/gists
*/
function fetchGists({handle}) { // get user data
  return this.getData({path:`/users/${handle}/gists`})
    .then(response => {
      return response.data;
    });
}



module.exports = {
  fetchGists: fetchGists
};

