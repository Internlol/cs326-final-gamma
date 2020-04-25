# Project Setup

* Run tsc in terminal (Turns typescript files into javascript)

* Add _"scripts": {
    "start": "node server.js",
  },_ in package.json

* Deploying to Heroku

    * Set up routing for a static web page

    * Use Heroku's server port using _server.listen(process.env.PORT);_

    * Create Procfile (_web: node server.js_)

    * Create a .gitignore and add _node_modules/*_ as the first line

    * Commands to deploy to Heroku (in order):

        * npm init -y

        * heroku login

        * heroku create

            * This will give us a URL _"https:/	/<random>-<words>-#####.herokuapp.com";_ which we replace at _const url = <URL GOES HERE>_

        * Log into the Heroku website

        * Deploy branch by connecting github repo and enable automatic deploys