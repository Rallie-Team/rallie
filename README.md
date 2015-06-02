# Joseki ![Travis CI build status](https://travis-ci.org/VacantAardvark/joseki.svg?branch=master)
Find, engage, and run local events in your community with ease.

## Table of Contents ##
  1. [Usage](#usage)
  2. [Requirements](#requirements)
  3. [Development](#development)
    1. [Installing dependencies](#installing-dependencies)
    2. [Tasks](#tasks)
  4. [Team](#team)
  5. [Contributing](#contributing)

## Usage ##

## Requirements ##

- Node.js 0.10.36
- PostgreSQL 9.4.2

## Development ##

### Installing dependencies ###
Run `npm install` from the project's root directory.

Install a local PostgresSQL database:

```
brew update
brew doctor
brew install postgresql
initdb /usr/local/var/postgres -E utf8
mkdir -p ~/Library/LaunchAgents
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
createdb joseki
```

This project uses Facebook authentication, and as such, you must create an app ID and secret through Facebook. 
In the development environment, you must create a `thirdPartyServices.js` file within the `server/config/environment` directory. 
This is required in configuration files, and it should export the settings for your Facebook app.

Here is an example of how the `thirdPartyServices.js` file should be set up. It must export a `facebook` object with 
keys for `id`, `secret`, and `callback`.

```
// server/config/environment/thirdPartyServices.js
module.exports = {
  facebook: {
    id: 12345,
    secret: 'abc123',
    callback: 'http://hostname.com/auth/facebook/callback'
  }
};
```

In the test and production environments, you will define these Facebook settings using environment variables 
`process.env.FACEBOOK_ID`, `process.env.FACEBOOK_SECRET`, and `process.env.FACEBOOK_CALLBACK`.

### Tasks ###
If you want to build React files from the command line, you will first need to install watchify globally 
by running `npm install -g watchify`. Afterwards, run `watchify -v -t reactify client/public/js/app.js -o client/public/js/bundle.js` 
to automatically compile the React files whenever they are modified.

If you want to use Gulp to automate the watching and building of the React files, run `gulp react` from the project root directory.

## Team ##

  - __Product Owner__: [Derek Sakamoto](https://github.com/dmsakamoto)
  - __Scrum Master__: [Steven Shyun](https://github.com/stevenshuhyo)
  - __Co-Founding Engineer__: [Kevin Huang](https://github.com/kevhuang)
  - __Co-Founding Engineer__: [Eddie Kong](https://github.com/ekong2)

## Contributing ##

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.