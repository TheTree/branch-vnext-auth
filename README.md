Branch VNext Authentication
===
[![Build status](https://img.shields.io/travis/TheTree/branch-vnext-auth.svg?style=flat-square&label=windows%20build)](https://travis-ci.org/TheTree/branch-vnext-auth) [![Github Issues](https://img.shields.io/github/issues/TheTree/branch-vnext-auth.svg?style=flat-square)](https://github.com/TheTree/branch-vnext-auth/issues) [![Github Forks](https://img.shields.io/github/forks/TheTree/branch-vnext-auth.svg?style=flat-square)](https://github.com/TheTree/branch-vnext-auth/network) [![Github Stars](https://img.shields.io/github/stars/TheTree/branch-vnext-auth.svg?style=flat-square)](https://github.com/TheTree/branch-vnext-auth/stargazers) [![Github License](https://img.shields.io/github/license/thetree/branch-vnext-auth.svg?style=flat-square)](https://github.com/thetree/branch-vnext-auth/blob/master/LICENSE.md)

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
