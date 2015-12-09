var Promise = require("bluebird")

module.exports = function(githubCohortRepoName, assignmentTitleSearch, findTerm, replaceTerm, github) {
  var githubIssuesAsync = Promise.promisifyAll(github.issues)
  console.log('looking for titles containing: ', assignmentTitleSearch);
  // !!! currently only pulls first 100 issues !!! will be many more!!!
  patchPagesIssues(20)

  function patchPagesIssues(numPages) {
    for (var i = 0; i < numPages; i++) {
      searchAndPatchPageOfIssues(i)
    };
  }

  function searchAndPatchPageOfIssues(pageNum) {
    var githubIssueFetchOptions = {
      user: 'dev-academy-programme',
      repo: githubCohortRepoName,
      pageNum: pageNum,
      per_page: 100
    }
    githubIssuesAsync.repoIssuesAsync(githubIssueFetchOptions)
      .filter(matchAssignmentTitle)
      .then(patchIssues)
      .catch(handleError)
  }

  function matchAssignmentTitle(issue) {
    console.log(issue.title)
    return issue.title.match(assignmentTitleSearch)
  }

  function patchAnIssue(issue) {
    console.log('...processing issue', issues[i].number);
    updatedBody = issues[i].body.replace(findTerm,replaceTerm)
    githubIssuesAsync.editAsync({
      user: 'dev-academy-programme',
      repo: githubCohortRepoName,
      number: issues[i].number,
      body: updatedBody
    }).then(function(responseIssue) {
      console.log('patched ',responseIssue.number);
    }).catch(handleError)
  }

  function patchIssues(issues) {
    console.log('num issues found: ', issues.length)
    for (var i = 0; i < issues.length; i++) {
      patchAnIssue(issues[i])
    }
  }

  function handleError(err) {
    console.log(err);
  }
}

