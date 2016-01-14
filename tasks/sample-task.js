module.exports = doThing

function doThing (context) {
  // context.githubApi
  // context.sprintNumber
  // context.folder...
  // ...
  return function (input, callback) {
    process.nextTick(function () { 
      callback(null) 
    })
  }
}