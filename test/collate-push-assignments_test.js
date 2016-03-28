var Promise = require("bluebird")
var GitHubApi = require("github")
var sinon = require("sinon")
var test = require("tape")

var collatePushAssignments = require("../collate-push-assignments.js")

var github = new GitHubApi({
  version: "3.0.0",
  debug: false,
  protocol: "https"
})

var githubReposAsync = Promise.promisifyAll(github.repos)
var stubbedRepos

test("setup", function (t) {
  stubbedRepos = sinon.stub(githubReposAsync, "getContentAsync")
    .returns(Promise.resolve({}))
  t.end()
})

test("collateAndPushAssignments calls getContentAsync", function(t) {
  collatePushAssignments(0, "wombat", "aardvark", null, githubReposAsync, github)
  t.true(stubbedRepos.called)
  t.end()
})

test("teardown", function (t) {
  stubbedRepos.restore()
  t.end()
})
