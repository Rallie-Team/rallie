'use strict';

module.exports = function(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, x-access-token'
  });
  if (req.method === 'OPTIONS') {
    res.send();
  } else {
    next();
  }
};