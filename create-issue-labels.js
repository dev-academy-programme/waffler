module.exports =   function(cohortRepo) {
  var githubUserOrOrg = 'dev-academy-phase0'
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