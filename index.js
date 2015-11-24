var GitHubApi = require('github')

var collateAndPushAssignments = require('./collate-push-assignments')
var createIssueLabels = require('./create-issue-labels')
var consoleHelp = require('./console-help')

var github = new GitHubApi({
  version: "3.0.0",
  debug: true,
  protocol: "https",
})



console.log(process.env.GITHUB_USERNAME);

// collect user input
var action = process.argv[2]
var assignmentsListPath = process.argv[3]
var githubCohortRepoName = process.argv[4]
var githubUsername = process.argv[5] || process.env.GITHUB_USERNAME
var githubPassword = process.argv[6] || process.env.GITHUB_PASSWORD


if (action === "push") {
  authenticateGithub()
  collateAndPushAssignments(assignmentsListPath, githubCohortRepoName, github)
} else if (action === "label") {
  authenticateGithub()
  createIssueLabels(githubCohortRepoName, github)
} else {
  consoleHelp()
}

function authenticateGithub() {
  github.authenticate({
    type: "basic", 
    username: githubUsername,
    password: githubPassword 
  })
}
