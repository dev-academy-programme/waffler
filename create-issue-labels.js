module.exports = function(cohortRepo, github) {
  
  var githubUserOrOrg = 'dev-academy-phase0'
  var issueColors = ['ffb366', 'ffd966', 'ffff66', 'd9ff66', '8cff66', '66ff8c', '66ffd9', '66d9ff', '668cff']
  var numOfWeeks = 9

  for (var week = 1; week <= numOfWeeks; week++) {
    github.issues.createLabel({
      user: githubUserOrOrg,
      repo: cohortRepo,
      name: 'sprint-' + week,
      color: issueColors[week]
    })
  };
}