var Promise = require("bluebird")
var fsp = Promise.promisifyAll(require("fs"))

module.exports = function (sprintNum, cohort, studentUsername, assignmentsFolder, githubReposAsync, github) {
  collateAndPushAssignments()
  
  function collateAndPushAssignments() {
    githubReposAsync.getContentAsync({
      user: 'dev-academy-programme',
      repo: 'curriculum-private',
      path: assignmentsFolder || 'assignments'
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
        assignmentName[0] == 'p'
    })
    console.log('assignments: ', assignments);
    var promises = [...assignments.map(function(assignment) {
      var folder = assignmentsFolder || 'assignments'
      return fsp.readFileAsync('./'+ folder + '/' + assignment + '/README.md', "utf-8")
    }), githubReposAsync.getContentAsync({
      user: 'dev-academy-programme',
      repo: cohort,
      path: "students.json"
    })]
    return Promise.all(promises)
  }

  function createAndPostIssues(data) {
    var studentList = convertToJSON(data.pop().content).studentGithubNames
    console.log('cohort students: ', studentList);
    var students =  studentUsername == '-' ? studentList : [studentUsername]              
    console.log('students pushing to: ', students);
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
    console.log('sorting issues...');
    var issues = sortIssues(unsortedIssues)
    console.log('posting issues...');
    postIssue(issues, 0)
  }

  function postIssue(issues, i) {
    if (i >= issues.length) { return }
    github.issues.create(issues[i], function(err, res) {
      if (err) { console.log(err) }
      console.log('assignment: ', res.title, ' >> ', res.assignee.login )
      i++
      postIssue(issues, i)
    })
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
    return titleSplit ? (parseInt(titleSplit[1])*1000 + parseInt(titleSplit[3])) : 100
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



