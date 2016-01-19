#!/usr/bin/env node

launchCommand(process.argv)

var pushAssignments = require('./push-assignments')
var createIssueLabels = require('./create-issue-labels')
var patchAssignments = require('./patch-assignments')
var printConsoleHelp = require('./console-help')

function launchCommand(input) {
  var action = input[2]
  
  if (action === "push") {
    // waffle push 3 moa-2010 all specialAssignmentsProgrammeFileName
    pushAssignments({
      sprintNum: input[3].match(/\d/),
      githubCohortRepoName: input[4],
      assignmentsFolder: input[6],
      githubApi: github
    })
  } else if (action === "label") {
    // waffle label moa-2010
    createIssueLabels({
      githubCohortRepoName: input[3],
      githubApi: github
    })
  } else if (action === "patch") {
    // waffle patch moa-2010 1.4 "skjdskljdsaf" "afkljadfslkj"
    patchAssignments({
      githubCohortRepoName: input[3],
      assignmentTitleSearch: input[4],
      findTerm: input[5],
      replaceTerm: input[6],
      githubApi: github
    })
  } else {
    printConsoleHelp()
  }
}

