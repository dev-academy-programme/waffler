var Promise = require("bluebird")

module.exports = function(githubCohortRepoName, assignmentTitleSearch, findTerm, replaceTerm, github) {
  var githubIssuesAsync = Promise.promisifyAll(github.issues)
  githubIssuesAsync.repoIssuesAsync({
    user: 'dev-academy-programme',
    repo: githubCohortRepoName 
  }).filter(function(issue) {
    return issue.title.match(assignmentTitleSearch)
  }).map(function(issue) {
    return issue.number
  }).then( function(data) {
    console.log(data);
  })
}

