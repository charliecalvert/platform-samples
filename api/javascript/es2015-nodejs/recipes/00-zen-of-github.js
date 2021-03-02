/**
 * Zen of GitHub
 */

const GitHubClient = require('../libs/GitHubClient.js').GitHubClient;
const octocat = require('../libs/features/octocat');


/* let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHITHUB_ENTERPRISE
}, octocat); */

let githubCli = new GitHubClient({
  baseUri:"https://api.github.com",
  token: process.env.TOKEN_GITHUB_DOT_COM
}, octocat);

githubCli.octocat()
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log("error", error)
  });

/*

               MMM.           .MMM
               MMMMMMMMMMMMMMMMMMM
               MMMMMMMMMMMMMMMMMMM      _________________________________
              MMMMMMMMMMMMMMMMMMMMM    |                                 |
             MMMMMMMMMMMMMMMMMMMMMMM   | Responsive is better than fast. |
            MMMMMMMMMMMMMMMMMMMMMMMM   |_   _____________________________|
            MMMM::- -:::::::- -::MMMM    |/
             MM~:~ 00~:::::~ 00~:~MM
        .. MMMMM::.00:::+:::.00::MMMMM ..
              .MM::::: ._. :::::MM.
                 MMMM;:::::;MMMM
          -MM        MMMMMMM
          ^  M+     MMMMMMMMM
              MMMMMMM MM MM MM
                   MM MM MM MM
                   MM MM MM MM
                .~~MM~MM~MM~MM~~.
             ~~~~MM:~MM~~~MM~:MM~~~~
            ~~~~~~==~==~~~==~==~~~~~~
             ~~~~~~==~==~==~==~~~~~~
                 :~==~==~==~==~~

 */