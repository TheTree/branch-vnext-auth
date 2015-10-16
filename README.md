Branch VNext Authentication
===
![https://travis-ci.org/TheTree/branch-vnext-auth](https://api.travis-ci.org/TheTree/branch-vnext-auth.svg?branch=master&style=flat) ![https://github.com/thetree/branch-vnext-auth/issues](https://img.shields.io/github/issues/thetree/branch-vnext-auth.svg?style=flat-square) ![https://github.com/thetree/branch-vnext-auth/blob/master/LICENSE.md](https://img.shields.io/github/license/thetree/branch-vnext-auth.svg?style=flat-square) ![https://travis-ci.org/TheTree/branch-vnext-auth](https://img.shields.io/travis/thetree/branch-vnext-auth.svg?style=flat-square)

A simple nodejs api to authenticate with [Halo Waypoint](https://halowaypoint.com), and [Xbox Live](https://xboxlive.com).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
git clone git@github.com:TheTree/branch-vnext-auth.git # or clone your own fork
cd branch-vnext-auth
npm install
npm start
```

Your app should now be running on [localhost:3001](http://localhost:3001/).

## Deploying to Heroku

```
heroku create
git push heroku master
heroku open
```

Alternatively, you can deploy your own copy of the app using the web-based flow:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
