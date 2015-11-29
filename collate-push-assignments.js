var Promise = require("bluebird")
var fsp = Promise.promisifyAll(require("fs"))

module.exports = function (sprintNum, cohort, studentUsername, githubReposAsync, github) {
  collateAndPushAssignments()
  
  function collateAndPushAssignments() {
    githubReposAsync.getContentAsync({
      user: 'dev-academy-programme',
      repo: 'curriculum-private',
      path: 'assignments'
    }).then(collateAssignmentsAndStudents)  // multiple, dependent
      .then(createAndPostIssues)
      .catch(function(err) {
        console.log(err);
      })
  }

  function collateAssignmentsAndStudents(allAssignments) {
    console.log('pushing sprint-' + sprintNum);
    console.log('cohort: ' + cohort);
    var assignments = allAssignments.map(function(assignment) {
      return assignment.name
    }).filter(function(assignmentName) {
      return assignmentName[0] == sprintNum ||
        parseInt(assignmentName[0]) == 'p'
    })
    console.log(assignments);
    var promises = [...assignments.map(function(assignment) {
      return fsp.readFileAsync('./assignments/' + assignment, "utf-8")
    }), githubReposAsync.getContentAsync({
      user: 'dev-academy-programme',
      repo: cohort,
      path: "students.json"
    })]
    return Promise.all(promises)
  }

  function createAndPostIssues(data) {
    var students = [studentUsername] || convertToJSON(data.pop().content).studentGithubNames
    console.log('students: ', students);
    var assignments = data.slice(0, -1).map(function(assignment) {
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
          user: 'dev-academy-programme',
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

  function postIssues(unsortedIssues) {
    var issues = sortIssues(unsortedIssues)
    console.log(issues);
    for (var i = 0; i < issues.length; i++) {
      
      github.issues.create(issues[i], function(err, res) {
        if (err) { console.log(err) }
        console.log('assignment: ', res.title, ' >> ', res.assignee.login );

      })

    };
  }

  function sortIssues(unsortedIssues) {
    return unsortedIssues.sort(function(a, b) {
      var aNum = getOrderablePartFromTitle(a.title)
      var bNum = getOrderablePartFromTitle(b.title)
      return aNum - bNum
    }).reverse()
  }

  function getOrderablePartFromTitle(title) {
    var titleSplit = title.match(/(\d+)(\.)(\d+)/)
    return parseInt(titleSplit[1])*1000 + parseInt(titleSplit[3])
  }

  function printFilteredStudentBoardLink(student) {
    console.log("posted to: ", "https://waffle.io/dev-academy-programme/" + cohort + "?search=" + student);
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



