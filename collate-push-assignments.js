var Promise = require("bluebird")
var fsp = Promise.promisifyAll(require("fs"))

module.exports = function (sprintAssignmentFile, cohort, githubReposAsync, github) {
  collateAndPushAssignments()
  
  function collateAndPushAssignments() {
    githubReposAsync.getContentAsync({
      user: 'dev-academy-phase0',
      repo: 'curriculum-private',
      path: sprintAssignmentFile
    }).then(collateAssignmentsAndStudents)  // multiple, dependent
      .then(createAndPostIssues)
      .catch(function(err) {
        console.log(err);
      })
  }

  function collateAssignmentsAndStudents(data) {
    var assignments = convertToJSON(data.content)
    var promises = [...Object.keys(assignments).map(function(key) {
      return fsp.readFileAsync('./assignments/' + assignments[key], "utf-8")
    }), githubReposAsync.getContentAsync({
      user: 'dev-academy-phase0',
      repo: cohort,
      path: "students.json"
    })]
    return Promise.all(promises)
  }

  function createAndPostIssues(data) {
    var sprintNum = sprintAssignmentFile.match(/\d/)
    var students = convertToJSON(data.pop().content).studentGithubNames
    var assignments = data.map(function(assignment) {
      return {
        title: assignment.match(/(?![#\s]).*$/m)[0],
        description: assignment.replace(/\[x\]/g, '[ ]')
      }
    })
    var issues = compileIssuesObject(assignments, students, sprintNum)
    postIssues(issues);
  }

  function compileIssuesObject(assignments, students, sprintNum){
    var issues = []
    for (var i = 0; i < students.length; i++) {
      for (var k = 0; k < assignments.length; k++) {
        issues.push({
          user: 'dev-academy-phase0',
          repo: cohort,
          title: assignments[k].title,
          body: assignments[k].description,
          assignee: students[i],
          labels: ['sprint-' + sprintNum]
        })
      }  
    }
    return issues
  }

  function postIssues(issues) {
    for (var i = 0; i < issues.length; i++) {
      github.issues.create(issues[i], function(err, res) {
        if (err) { console.log(err) }
        console.log('assignment: ', res.title);
        printFilteredStudentBoardLink(res.assignee.login);
      })
    };
  }

  function printFilteredStudentBoardLink(student) {
    console.log("posted to: ", "https://waffle.io/dev-academy-phase0/" + cohort + "?search=" + student);
  }

  function convertToJSON(data){
    var b = new Buffer(data, 'base64')
    return JSON.parse(b.toString())
  }

  function convertToString(data){
    var b = new Buffer(data, 'base64')
    return b.toString() 
  }
}



