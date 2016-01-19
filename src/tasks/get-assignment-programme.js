module.exports = getAssignmentsProgramme

function getAssignmentsProgramme (context) {
  // context.githubApi
  // context.sprintNumber
  // context.folder...
  // ...
  return function (input, callback) {
    console.log(context)
    context.githubApi.get
  }
}