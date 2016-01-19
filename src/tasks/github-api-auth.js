var GitHubApi = require('github')
var prompt = require('prompt')

var githubApi = new GitHubApi({
  version: "3.0.0",
  debug: false,
  protocol: "https",
})

function authenticateGithub(githubApi) {
  if (!!process.env.GITHUB_USERNAME && !!process.env.GITHUB_PASSWORD) {
    authenticateSession({
      githubApi: githubApi,
      githubUsername: process.env.GITHUB_USERNAME,
      githubPassword: process.env.GITHUB_PASSWORD
    })
  } else {
    prompt.start()
    var schema = {
    properties: {
      githubUsername: {
        required: true
      },
      githubPassword: {
        required: true,
        hidden: true
      }
    }
    prompt.get(schema, function(err, result) {
      if (err) { throw err }
      authenticateSession({
        githubApi: githubApi,
        githubUsername: result.githubUsername, 
        githubPassword: result.githubPassword)
    })
  }
}

function authenticateSession(options) {
  options.github.authenticate({
    type: "basic", 
    username: options.githubUsername,
    password: options.githubPassword 
  })  
}

authenticateGithub(githubApi)

module.exports = githubApi