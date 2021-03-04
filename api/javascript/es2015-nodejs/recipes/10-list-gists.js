/**
 * Lists gist on GitHub
 * node recipes/10-list-gists.js
 * Author Charlie Calvert
 */

const GitHubClient = require("../libs/GitHubClient.js").GitHubClient;
const listgists = require("../libs/features/listgists");
const fs = require("fs");
const elfUtils= require("elven-code").elfUtils;
//const sc = require("../libs/colors/st")

/* let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHITHUB_ENTERPRISE
}, octocat); */

// await octokit.request('GET /gists')

let githubCli = new GitHubClient(
  {
    baseUri: "https://api.github.com",
    token: process.env.TOKEN_GITHUB_DOT_COM,
  },
  listgists
);

let bashData = `
#! /usr/bin/env bash

===INSERT_COLORS===

===INSERT_NAMES===

function message {
  echo
  echo =======================
  echo "$1"
  echo =======================
  echo
}

function removeDir {
  if [ -d $ESLINT_DIR ]; then
      rm -rf $ESLINT_DIR
      echo "Deleted " $ESLINT_DIR
  fi
}

function getGist() {
  removeDir
  git clone $1 $ESLINT_DIR
  echo -e "NUMBER 2 = $2"
  cp -v $ESLINT_DIR/$2 .
}

function getRepo() {
  removeDir
  git clone $1 $ESLINT_DIR
}

function runCommand() {
  INSTALL_ESLINT_PACKAGES=installEslintPackages
  case $1 in
      "elfdebug") getGist $GIST_ELF_DEBUG_ENZYME ElfDebugEnzyme.js ;;
      "reactcomp") getGist $GIST_REACT_COMPONENT ReactComponent.js ;;\
      "setrnen") getGist $GIST_REACT_NATIVE_ENZYME_NPM  setup-enzyme-react-native-npm ;;\
      "setrney") getGist $GIST_REACT_NATIVE_ENZYME_YARN  setup-enzyme-react-native-yarn ;;\
      "elvenlogger") getGist $GIST_ELVEN_LOGGER elven-logger.js ;;\
      "reactcontrol") getGist $GIST_REACT_CONTROL control.js ;;\
      "reactclass") getGist $GIST_REACT_CLASS ElfApp.js ;;
      "elven-html") getGist $GIST_ELF_HTML elf-index.html;;
      "elven-local-storage") getGist $GIST_ELVEN_LOCAL_STORAGE elf-local-storage.js ;;
      "elven-systemd-tools") 

  esac
  # removeDir
}

while true; do
    message "Menu"
    echo -e "$LIGHT_GREEN Gists"
    echo -e "$LIGHT_GREEN  a) Install ESLintRc and Prettier in cwd (cdef)"
    echo -e "$LIGHT_GREEN  b) ElfDebugEnzyme"
    echo -e "$LIGHT_GREEN  c) .eslintrc"
    echo -e "$LIGHT_GREEN  d) .eslintignore"
    echo -e "$LIGHT_GREEN  e) prettier"
    echo -e "$LIGHT_GREEN  f) .prettierrc"
    echo -e "$LIGHT_GREEN  g) Default React Component"    
    echo -e "$LIGHT_GREEN  h) Setup React Native Enzyme Npm"
    echo -e "$LIGHT_GREEN  i) Setup React Native Enzyme Yarn"
    echo -e "$LIGHT_GREEN  j) ElvenLogger"
    echo -e "$LIGHT_GREEN  k) Elven Node systemd Tools"
    echo -e "$LIGHT_GREEN  l) Elven Create Concurrently"
    echo -e "$LIGHT_GREEN  m) React Control Component for elf-express"
    echo -e "$LIGHT_GREEN  n) Simple React Class Component"
    echo -e "$LIGHT_GREEN  o) Elf Basic HTML Starter Page"
    echo -e "$LIGHT_GREEN  p) Elf Local Storage"
    echo -e "$LIGHT_GREEN  r) Elf Firebase"
    echo -e "$LIGHT_RED  x) Exit"
    echo -e "\n$NC"
    read -p "Please make a selection: " eotuyx
    case $eotuyx in
        [Aa]* ) runEsLintAndPrettier false; continue;;
        [Bb]* ) runCommand "elfdebug"; continue;;
        [Cc]* ) runCommand "eslintrc"; continue;;
        [Dd]* ) runCommand "eslintignore"; continue;;
        [Ee]* ) runCommand "prettier"; continue;;
        [Ff]* ) runCommand "prettierrc"; continue;;
        [Gg]* ) runCommand "reactcomp"; continue;;
        [Hh]* ) runCommand "setrnen"; continue;;
        [Ii]* ) runCommand "setrney"; continue;;
        [Jj]* ) runCommand "elvenlogger"; continue;;
        [Kk]* ) runCommand "elven-systemd-tools"; continue;;
        [Ll]* ) runCommand "elven-create-concur"; continue;;
        [Mm]* ) runCommand "reactcontrol"; continue;;
        [Nn]* ) runCommand "reactclass"; continue;;
        [Oo]* ) runCommand "elven-html"; continue;;
        [Pp]* ) runCommand "elven-local-storage"; continue;;
        [Rr]* ) runCommand "elven-firebase"; continue;;
        [XxQq]* ) break;;
        * )  -e "\n$NC" + "Please answer with a, b, c or x.";;
    esac
done
`;

function readFile(fileName) {
  "use strict";
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, "utf8", function (err, fileContents) {
      if (err) {
        reject(err);
      }
      resolve({
        result: fileContents,
      });
    });
  });
}

function writeFile(fileName, contents) {
  "use strict";
  return new Promise(function (resolve, reject) {
    fs.writeFile(fileName, contents, "utf8", function (err) {
      if (err) {
        reject(err);
      }
      resolve({
        result: "success",
      });
    });
  });
}

//var sc = readFile("../libs/colors/standard_colors");
/* readFile("./libs/colors/standard-colors.sh")
.then((value) => {
  //console.log(value.result);
  bashData = bashData.replace('===INSERT_COLORS===', value.result);
  //console.log(bashData);
})
.catch((err) => {
  console.log(err);
}); */

const colors = fs.readFileSync("./libs/colors/standard-colors.sh");
bashData = bashData.replace('===INSERT_COLORS===', colors);
console.log(bashData);

function stripExtension(fileName) {
  'use strict';
  if (fileName.includes('.') && (fileName.lastIndexOf('.') !== 0)) {
      return fileName.substr(0, fileName.lastIndexOf('.'));
  } else {
      return fileName;
  }
}

githubCli
  .fetchGists({ handle: "charliecalvert" })
  .then((data) => {
    console.log(data.length);
    for (const item of data) {
      const keys = Object.keys(item.files);
      console.log(stripExtension(keys[0]).toUpperCase() + "=" + item.git_pull_url);
    }
    writeFile("get-all-gist", bashData);
  })
  .catch((error) => {
    console.log("error", error);
  });
 