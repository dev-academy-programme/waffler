module.exports = function() {
  console.log(`
    to send assignments:
    $ wafflepusher push <assignments> <cohort> <github username*> <github password*>
    e.g.
    $ wafflepusher push 1-assignments moa-2016 peterjacobson mypassword12

    * not required if exporting GITHUB_USERNAME and GITHUB_PASSWORD from shell




    to create sprint labels (needs to be done once per cohort):

    $ wafflepusher label nil moa-2016 peterjacobson mypassword12
  `);
}