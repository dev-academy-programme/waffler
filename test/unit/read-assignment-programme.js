var test = require('tape')
var sinon = require('sinon')

var githubGet = sinon.stub(githubApi, "get")

var getAssignmentProgrammeModule = require('./../../src/tasks/get-assignment-programme')
var getAssignmentProgramme = getAssignmentProgrammeModule({
  githubApi: githubGet
})

test('sends correct request to github', assert => {
  // arrange
  // act
  getAssignmentProgramme()
  // assert
  assert.ok(githubGet.called);
  assert.end();
});
