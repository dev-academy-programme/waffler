var Promise = require("bluebird")

module.exports = function(githubCohortRepoName, assignmentTitleSearch, findTerm, replaceTerm, github) {
  var githubIssuesAsync = Promise.promisifyAll(github.issues)
  console.log('looking for titles containing: ', assignmentTitleSearch);
  // !!! currently only pulls first 100 issues !!! will be many more!!!
  var numPagesOf100Issues = 20
  for (var i = 0; i < numPagesOf100Issues; i++) {
    githubIssuesAsync.repoIssuesAsync({
      user: 'dev-academy-programme',
      repo: githubCohortRepoName,
      page: i,
      per_page: 100
    }).filter(function(issue) {
      console.log(issue.title);
      return issue.title.match(assignmentTitleSearch)
    }).then(function(issues) {
      for (var i = 0; i < issues.length; i++) {
        findExpression = new RegExp(findTerm, "g")
        updatedBody = issues[i].body.replace(findExpression,replaceTerm)
        githubIssuesAsync.editAsync({
          user: 'dev-academy-programme',
          repo: githubCohortRepoName,
          number: issues[i].number,
          body: updatedBody
        }).then(function(responseIssue) {
          console.log('patched ',responseIssue.number);
        }).catch(function(err) {
          console.log(err);
        })
      };
    }).catch(function(err) {
      console.log(err);
    })
  };
}

