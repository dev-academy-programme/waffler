var Promise = require("bluebird")

module.exports = function(githubCohortRepoName, assignmentTitleSearch, findTerm, replaceTerm, github) {
  var githubIssuesAsync = Promise.promisifyAll(github.issues)
  githubIssuesAsync.repoIssuesAsync({
    user: 'dev-academy-programme',
    repo: githubCohortRepoName 
  }).filter(function(issue) {
    return issue.title.match(assignmentTitleSearch)
  }).then( function(issues) {
    for (var i = 0; i < issues.length; i++) {
      updatedBody = issues[i].body.replace(findTerm,replaceTerm)
      github.issues.edit({
        user: 'dev-academy-programme',
        repo: githubCohortRepoName,
        number: issues[i].number,
        body: updatedBody
      })
    };
  })
}

