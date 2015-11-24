module.exports = function() {
  console.log(`

Options:
  push      push a sprint of assignments to a cohort
  label     add sprint-1 to 9 labels to cohort repo


Examples:
  send assignments:
        $ assignment-pusher push <assignments> <cohort> <github username*> <github password*>
    e.g.$ assignment-pusher push 1-assignments moa-2016 peterjacobson* mypassword12*

      * not required if exporting GITHUB_USERNAME and GITHUB_PASSWORD from shell

  create sprint labels for cohort repo (once per cohort):
        $ assignment-pusher label nil <cohort> <github username*> <github password*>
    e.g.$ assignment-pusher label nil moa-2016 peterjacobson mypassword12


Detailled usage:
  1. globally install push-waffle 'npm install -g push-waffle'
  1. Create cohort repo e.g. 'moa-2016' in the 'dev-academy-phase0' org
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
  3. Clone/navigate to [curriculum-private](https://github.com/dev-academy-phase0/curriculum-private)
  4. 'git pull' to get latest changes
  5. run push-waffle 'push-waffle 4-assignments.json'
  
  `);
}