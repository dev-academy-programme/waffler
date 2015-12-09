var Promise = require("bluebird")

module.exports = function(githubCohortRepoName, assignmentTitleSearch, findTerm, replaceTerm, github) {
  var githubIssuesAsync = Promise.promisifyAll(github.issues)
  console.log('looking for titles containing: ', assignmentTitleSearch);
  // !!! currently only pulls first 100 issues !!! will be many more!!!
  githubIssuesAsync.repoIssuesAsync({
    user: 'dev-academy-programme',
    repo: githubCohortRepoName,
    per_page: 100
  }).filter(function(issue) {
    console.log(issue.title);
    return issue.title.match(assignmentTitleSearch)
  }).then(function(issues) {
    console.log('num issues found: ', issues.length)
    for (var i = 0; i < issues.length; i++) {
      console.log('...processing issue', issues[i].number);
      updatedBody = issues[i].body.replace(findTerm,replaceTerm)
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
}

