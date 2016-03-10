# Waffler
Load a json of issues into a git repo

## setting up cohort curriculum

1. export GITHUB_USERNAME and GITHUB_PASSWORD from shell 
  to avoid github details prompt

2. 'npm install -g waffler'

3. Create cohort repo e.g. 'moa-2016' in the 'dev-academy-programme' org

4. Add 'students.json' to root of cohort repo, e.g.
  {
    "studentGithubNames": [
      "peterjacobson",
      "pietgeursen",
      "jamanius",
      "joshuavial"
    ]
  }

5. Clone & navigate to [curriculum-private](https://github.com/dev-academy-programme/curriculum-private) *the waffler gets list of assignments from github.com, but scrapes local file system for assignment content. don't ask. needs rebuild*

6. 'git pull' to get latest changes

7. run as below:

Options:
  push      push a sprint of assignments to a cohort
  label     add sprint-1 to 9 labels to cohort repo
  patch     execute find & replace on an assignment in a repo

Examples:
  
  add sprint labels to cohort repo (needed once per cohort):
        $ waffle label <cohort>
    e.g.$ waffle label moa-2016

  push assignments:
        $ waffle push <sprint#> <cohort> <members>
    e.g.$ waffle push 1 moa-2016 -  
    e.g.$ waffle push 3 moa-2016 peterjacobson
    <members>: '-'= all users listed in students.json in root of cohort repo OR 'githubusername' 

  patch assignments:
        $ waffle patch <cohort> <assignment number> <string to find> <string to replace>
    e.g.$ waffle patch moa-2010 4.2 "string to find" "string to replace"