var Promise = require("bluebird")
var fsp = Promise.promisifyAll(require("fs"))

module.exports = function (sprintAssignmentFile, cohort, github) {
  collateAndPushAssignments()
  
  function collateAndPushAssignments() {
    github.getContentAsync({
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
      return fsp.readFileAsync('./Assignments/' + assignments[key], "utf-8")
    }), github.getContentAsync({
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
    console.log(issues);
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

  function convertToJSON(data){
    var b = new Buffer(data, 'base64')
    return JSON.parse(b.toString())
  }

  function convertToString(data){
    var b = new Buffer(data, 'base64')
    return b.toString() 
  }
}



// var moaStudents = ['peterjacobson', 'pietgeursen', 'locksmithdon', 'jamanius', 'joshuavial']

  // var issues = compileIssuesObject(githubUserOrOrg, cohortRepo, assignments, moaStudents)
  // postSprintLabels(githubUserOrOrg, cohortRepo)
  // postIssues(issues)



  // var assignments = [
  //   {
  //     title: 'command line',
  //     description: '- [ ] follow [command line basics tutorial](dskjf)\n- [ ] complete [basic command line challenges](sdkjh)'
  //   },
  //   {
  //     title: 'shell scripting',
  //     description: '- [ ] complete [aliasing challenge](sdlk)\n- [ ] complete [github task sucker app](sdkl)'
  //   }
  // ]



  // function postIssues(issues) {
  //   for (var i = 0; i < issues.length; i++) {
  //     github.issues.create(issues[i], function(err, res) {
  //     })
  //   };
  // }