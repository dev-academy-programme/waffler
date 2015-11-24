var Promise = require("bluebird")

module.exports = function (sprintAssignmentFile, cohort, github) {
  collateAndPushAssignments()
  
  function collateAndPushAssignments() {
    github.getContentAsync({
      user: 'dev-academy-phase0',
      repo: 'curriculum-private',
      path: sprintAssignmentFile
    }).then(function(data) {
      return convertToJSON(data.content)
    }) // single
      .then(collateAssignments)  // multiple, dependent
      // .then(getStudents)  // single, parallel
      // .then(createAndPostIssues)
      .catch(function() {
        console.log('promisefail yo');
      })
  }

  var getSprintAssignmentData = function() {
    console.log(sprintAssignmentFile);
    return new Promise(function(resolve, reject) {
      github.repos.getContent()
    })

    /*
    return github.repos.getContent({})
      .then(function (data) {
        return convertToJSON(data.content)
      })
      .then
    */
  }

  var collateAssignments = function(assignments) {
    console.log('collating yo');
    return Promise.all(
      Object.keys(assignments).map(function(key) {
        return getAssignmentContent(assignments[key])
      })
    )
  }

  // Needs github object
  var getAssignmentContent = function(assignmentFilePath) {
    console.log('getAssignmentContent', assignmentFilePath);
    return new Promise(function(resolve, reject) {
      github.repos.getContent({
        user: 'dev-academy-phase0',
        repo: 'curriculum-private',
        path: 'assignments/' + assignmentFilePath
      }, function(err, data) {
        if (err) { reject(err) }
        console.log(data);
        resolve(convertToString(data.content))
      })
    })
  }

  function convertToJSON(data){
    var b = new Buffer(data, 'base64')
    return JSON.parse(b.toString())
  }

  function convertToString(data){
    var b = new Buffer(data, 'base64')
    return b.toString() 
  }

  return {
    collateAndPushAssignments: collateAndPushAssignments
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