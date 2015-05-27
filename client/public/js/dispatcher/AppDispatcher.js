var Dispatcher = require('flux').Dispatcher;

//Creates a flux dispatcher
//The dispatcher is filled with registered cases in
//the stores folder which will determine which actions
//will follow
module.exports = new Dispatcher();
