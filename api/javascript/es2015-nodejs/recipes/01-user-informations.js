/**
 * Get GitHub user informations
 */

const GitHubClient = require("../libs/GitHubClient.js").GitHubClient;
const users = require("../libs/features/users");

/* let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHITHUB_ENTERPRISE
}, users); */

let githubCli = new GitHubClient(
  {
    baseUri: "https://api.github.com",
    token: process.env.TOKEN_GITHUB_DOT_COM,
  },
  users
);

githubCli
  .fetchUser({ handle: "charliecalvert" })
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log("error", error);
  });
