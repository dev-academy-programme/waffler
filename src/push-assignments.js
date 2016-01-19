var bulk = require('bulk-require')
var auto = require('run-auto')
var mapValues = require('ramda').mapValues

module.exports = pushAssignments

function pushAssignments(options) {
  var context = {

  }
  var tasks = map(
    bulk(__dirname, 'tasks/*.js'),
    function (module) {
      console.log("module", module)
        return module(context)
    }
  )

  var entryTasks = mapValues(
    entries, function (entr
  )

  auto(tasks, function (err) {
    if (err) { throw err }
    console.log("done!")
  })
}

// authenticate github
// get all issues
// read assignment-programme
// select sprint's assignments
// read assignment contents
// compile assignments into issue
// create issues for each student
// push a 


