var Promise = require("bluebird")
// var fsp = Promise.promisifyAll(require("fs"))

module.exports = function(sprintAssignmentFile, cohort, github) {
  // var githubReposAsync = Promise.promisifyAll(github.repos)
  // githubReposAsync.getContentAsync({
  // })
  //   .then(convertToJSON)
  //   .then()
  getSprintAssignmentData(sprintAssignmentFile, cohort, github)
    .then(convertToJSON)
}

var getSprintAssignmentData = function(sprintAssignmentFile, cohort, github) {
  return new Promise(function(resolve, reject) {
    github.repos.getContent({
      user: 'dev-academy-phase0',
      repo: 'curriculum-private',
      path: sprintAssignmentFile
    }, function(err, data) {
      if (err) { reject(err) }
      resolve(data)
    })
  })
}

function convertToJSON(data){
  var b = new Buffer(data.content, 'base64')
  var assignments = JSON.parse(b.toString())
  console.log(assignments);
}

// function getContent

      // read&parse #-assignments.json
        // read&parse assignment md files]
          // build issues from assignments
            // read&parse list of students from cohort repo students.json
              //  post issues to github


  // fs.readFileAsync(sprintAssignmentPath, function(err, data) {
  //   if (err) { throw err }
  //   assignmentPaths = JSON.parse(data)
  //   console.log(assignmentPaths);
  // })
  // console.log(sprintAssignments);


  var moaStudents = ['peterjacobson', 'pietgeursen', 'locksmithdon', 'jamanius', 'joshuavial']
  var githubUserOrOrg = 'dev-academy-phase0'

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


  // function compileIssuesObject(githubUserOrOrg, destinationRepo, assignments, student_github_names){
  //   var issues = []
  //   for (var i = 0; i < student_github_names.length; i++) {
  //     for (var k = 0; k < assignments.length; k++) {
  //       issues.push({
  //         user: githubUserOrOrg,
  //         repo: destinationRepo,
  //         title: assignments[k].title,
  //         body: assignments[k].description,
  //         assignee: student_github_names[i],
  //         labels: ['sprint-1']
  //       })
  //     }  
  //   }
  //   return issues
  // }

  // function postIssues(issues) {
  //   for (var i = 0; i < issues.length; i++) {
  //     github.issues.create(issues[i], function(err, res) {
  //     })
  //   };
  // }