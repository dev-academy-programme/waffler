var fs = require("fs")
var prompt = require("prompt")
var GitHubApi = require('github')
var github = new GitHubApi({
  version: "3.0.0",
  debug: true,
  protocol: "https",
})

// get params

  // authenticate github
    // add sprint labels if needed

  // read&parse #-assignments.json
    // read&parse assignment md files]
      // build issues from assignments

    //  post issues to github


github.authenticate({
  type: "basic", 
  username: process.env.GITHUB_USER,
  password: process.env.GITHUBPASSWORD
})

userParams = getParams()
console.log(userParams);

function getParams(){
  var sprintAssignmentPath = './' + process.argv[2]
  var promptResults
  var schema = {
    properties: {
      cohort: {
        message: "cohort's git repo, e.g. moa-2016",
        required: true
      },
      githubUsername: {
        required: true
      },
      githubPassword: {
        required: true,
        hidden: true
      }
    }
  }
  prompt.start()
  prompt.get(schema, function(err, results) {
    if (err) { throw err }
    promptResults = results
  })
  return {
    sprintAssignmentPath: sprintAssignmentPath,
    githubCohortRepo: promptResults.cohort,
    githubUsername: promptResults.githubUsername,
    githubPassword: promptResults.password,
  }
}

// fs.readFile(sprintAssignmentPath, function(err, data) {
//   if (err) { throw err }
//   assignmentPaths = JSON.parse(data)
//   console.log(assignmentPaths);
// })
// console.log(sprintAssignments);

var assignments = [
  {
    title: 'command line',
    description: '- [ ] follow [command line basics tutorial](dskjf)\n- [ ] complete [basic command line challenges](sdkjh)'
  },
  {
    title: 'shell scripting',
    description: '- [ ] complete [aliasing challenge](sdlk)\n- [ ] complete [github task sucker app](sdkl)'
  }
]

var moaStudents = ['peterjacobson', 'pietgeursen', 'locksmithdon', 'jamanius', 'joshuavial']
var githubUserOrOrg = 'dev-academy-phase0'
var cohortRepo = 'kakapo-2016-backlog'

var issues = compileIssuesObject(githubUserOrOrg, cohortRepo, assignments, moaStudents)
// postSprintLabels(githubUserOrOrg, cohortRepo)
// postIssues(issues)

function postSprintLabels(githubUserOrOrg, cohortRepo) {
  var colors = ['ffb366', 'ffd966', 'ffff66', 'd9ff66', '8cff66', '66ff8c', '66ffd9', '66d9ff', '668cff']
  numOfWeeks = 9
  for (var week = 1; week <= numOfWeeks; week++) {
    github.issues.createLabel({
      user: githubUserOrOrg,
      repo: cohortRepo,
      name: 'sprint-' + week,
      color: colors[week]
    })
  };
}

function compileIssuesObject(githubUserOrOrg, destinationRepo, assignments, student_github_names){
  var issues = []
  for (var i = 0; i < student_github_names.length; i++) {
    for (var k = 0; k < assignments.length; k++) {
      issues.push({
        user: githubUserOrOrg,
        repo: destinationRepo,
        title: assignments[k].title,
        body: assignments[k].description,
        assignee: student_github_names[i],
        labels: ['sprint-1']
      })
    }  
  }
  return issues
}

function postIssues(issues) {
  for (var i = 0; i < issues.length; i++) {
    github.issues.create(issues[i], function(err, res) {
    })
  };
}
