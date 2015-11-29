var Promise = require("bluebird")
var GitHubApi = require('github')

var collateAndPushAssignments = require('./collate-push-assignments')
var createIssueLabels = require('./create-issue-labels')
var consoleHelp = require('./console-help')



var github = new GitHubApi({
  version: "3.0.0",
  debug: false,
  protocol: "https",
})

var githubReposAsync = Promise.promisifyAll(github.repos)

// collect user input
var action = process.argv[2]

function push() {
  if (action === "push") {
    var sprintNum = process.argv[3].match(/\d/)
    var githubCohortRepoName = process.argv[4]
    // shove this into authenticate github function as a prompt
    var githubUsername = process.argv[5] || process.env.GITHUB_USERNAME
    var githubPassword = process.argv[6] || process.env.GITHUB_PASSWORD
    // 
    authenticateGithub()
    collateAndPushAssignments(sprintNum, githubCohortRepoName, githubReposAsync, github)
  } else if (action === "label") {
    var githubCohortRepoName = process.argv[3]
    authenticateGithub()
    createIssueLabels(githubCohortRepoName)
  } else {
    consoleHelp()
  }
}

function authenticateGithub() {
  github.authenticate({
    type: "basic", 
    username: githubUsername,
    password: githubPassword 
  })
}
module.exports = push
