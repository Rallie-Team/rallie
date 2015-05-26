/** 
 * Error responses
 */

'use strict';

module.exports[404] = function pageNotFound (request, response) {
  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
    status: statusCode
  };

  response.status(result.status);
  response.render(viewFilePath, function (err) {
    if (err) {
      return response.json(result, result.status);
    }
    response.render(viewFilePath);
  });
};
