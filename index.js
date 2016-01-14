var GitHubApi = require('github')
var prompt = require('prompt')

var pushAssignments = require('./push-assignments')
var createIssueLabels = require('./create-issue-labels')
var patchAssignments = require('./patch-assignments')
var printConsoleHelp = require('./console-help')

var github = new GitHubApi({
  version: "3.0.0",
  debug: false,
  protocol: "https",
})

function waffle() {
  var action = process.argv[2]

  if (action === "push") {
    // waffle push 3 moa-2010 -[OR]githubusername specialAssignmentsProgrammeFileName
    authenticateGithub()
    var options = {
      sprintNum: process.argv[3].match(/\d/),
      githubCohortRepoName: process.argv[4],
      studentGithubUsername: process.argv[5],
      assignmentsFolder: process.argv[6],
      githubApi: github
    }
    pushAssignments(options)

  } else if (action === "label") {
    // waffle label moa-2010
    authenticateGithub()
    var options = {
      githubCohortRepoName: process.argv[3],
      githubApi: github
    }
    createIssueLabels(options)

  } else if (action === "patch") {
    // waffle patch moa-2010 1.4 "skjdskljdsaf" "afkljadfslkj"
    authenticateGithub()
    var options = {
      githubCohortRepoName: process.argv[3],
      assignmentTitleSearch: process.argv[4],
      findTerm: process.argv[5],
      replaceTerm: process.argv[6],
      githubApi: github
    }
    patchAssignments(options)

  } else {
    printConsoleHelp()
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

