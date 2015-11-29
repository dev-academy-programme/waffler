module.exports = function() {
  console.log(`

Options:
  push      push a sprint of assignments to a cohort
  label     add sprint-1 to 9 labels to cohort repo


Examples:
  send assignments:
        $ waffle push <sprint#> <cohort>
    e.g.$ waffle push 1 moa-2016


  create sprint labels for cohort repo (needed once per cohort):
        $ waffle label <cohort>
    e.g.$ waffle label moa-2016

  export GITHUB_USERNAME and GITHUB_PASSWORD from shell 
  to avoid github details prompt


Detailled usage:
  1. globally install assignment-pusher 'npm install -g assignment-pusher'
  1. Create cohort repo e.g. 'moa-2016' in the 'dev-academy-programme' org
  2. Add 'students.json' to root of cohort repo, e.g.
    '
    {
      "studentGithubNames": [
        "peterjacobson",
        "pietgeursen",
        "jamanius",
        "joshuavial"
      ]
    }
    '
  3. Clone/navigate to [curriculum-private](https://github.com/dev-academy-programme/curriculum-private)
  4. 'git pull' to get latest changes
  5. run as per instructions above
  
  `);
}