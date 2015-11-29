module.exports = function(cohortRepo, github) {
  
  var githubUserOrOrg = 'dev-academy-programme'
  var issueColors = ['ffb366', 'ffd966', 'ffff66', 'd9ff66', '8cff66', '66ff8c', '66ffd9', '66d9ff', '668cff']
  var numOfSprints = 9

  for (var sprint = 1; sprint <= numOfSprints; sprint++) {
    github.issues.createLabel({
      user: githubUserOrOrg,
      repo: cohortRepo,
      name: 'sprint-' + sprint,
      color: issueColors[sprint-1]
    })
    console.log('labelled sprint-' + sprint);
  };
}