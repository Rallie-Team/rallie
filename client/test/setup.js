var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!DOCTYPE HTML><html><body></body></html>');
global.window = document.parentWindow;
