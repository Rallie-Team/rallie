# Joseki #
> Find, engage, and run local events in your community with ease.

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

## Development ##

### Installing dependencies ###
Run `npm install` from the project's root directory.

If you want to build React files from the command line, you will need to install watchify globally 
by running `npm install -g watchify`.

If you want to use Gulp to watch and build the React files, run `gulp react` from the project root directory.

### Tasks ###
To build and automatically rebuild the React files on any updates, run the following command from the project's root directory:

`watchify -v -t reactify client/public/js/app.js -o client/public/js/bundle.js`

## Team ##

  - __Product Owner__: [Derek Sakamoto](https://github.com/dmsakamoto)
  - __Scrum Master__: [Steven Shyun](https://github.com/stevenshuhyo)
  - __Co-Founding Engineer__: [Kevin Huang](https://github.com/kevhuang)
  - __Co-Founding Engineer__: [Eddie Kong](https://github.com/ekong2)

## Contributing ##

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.