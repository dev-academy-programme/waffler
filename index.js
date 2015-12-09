var Promise = require("bluebird")
var GitHubApi = require('github')
var prompt = require("prompt")

var collateAndPushAssignments = require('./collate-push-assignments')
var createIssueLabels = require('./create-issue-labels')
var patchAssignments = require('./patch-assignments')
var consoleHelp = require('./console-help')



var github = new GitHubApi({
  version: "3.0.0",
  debug: false,
  protocol: "https",
})

var githubReposAsync = Promise.promisifyAll(github.repos)

// collect user input
var action = process.argv[2]

function waffle() {
  if (action === "push") {
    var sprintNum = process.argv[3].match(/\d/)
    var githubCohortRepoName = process.argv[4]
    var studentGithubUsername = process.argv[5]
    var assignmentsFolder = process.argv[6]
    authenticateGithub()
    collateAndPushAssignments(sprintNum, githubCohortRepoName, studentGithubUsername, assignmentsFolder, githubReposAsync, github)
  } else if (action === "label") {
    var githubCohortRepoName = process.argv[3]
    authenticateGithub()
    createIssueLabels(githubCohortRepoName, github)
  } else if (action === "patch") {
    // waffle patch moa-2010 1.4 "skjdskljdsaf" "afkljadfslkj"
    var githubCohortRepoName = process.argv[3]
    var assignmentTitleSearch = process.argv[4]
    var findTerm = process.argv[5]
    var replaceTerm = process.argv[6]
    authenticateGithub()
    patchAssignments(githubCohortRepoName, assignmentTitleSearch, findTerm, replaceTerm, github)
  } else {
    consoleHelp()
  }
}


function authenticateGithub() {
  if (!!process.env.GITHUB_USERNAME && !!process.env.GITHUB_PASSWORD) {
    authenticateSession(process.env.GITHUB_USERNAME,process.env.GITHUB_PASSWORD)
  } else {
    prompt.start()
    var schema = {
    properties: {
      githubUsername: {
        required: true
      },
      githubPassword: {
        required: true,
        hidden: true
      }
    }
  };
    prompt.get(schema, function(err, result) {
      if (err) { throw err }
      authenticateSession(result.githubUsername, result.githubPassword)
    })
  }
}

function authenticateSession(githubUsername, githubPassword) {
  github.authenticate({
    type: "basic", 
    username: githubUsername,
    password: githubPassword 
  })  
}

module.exports = waffle
