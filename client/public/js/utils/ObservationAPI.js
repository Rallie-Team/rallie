/**
 * Getter and setter functions for interacting with the server event API endpoints
 */

var ObservationAPI = {
  /**
   * Get all observations for an event
   * @param {number} eventId The primary key of the event in the database
   */
  getAllObservationsByEvent: function(eventId) {
    // Return a promise so the requester can chain the response
    return $.ajax({
      url: '/api/observation/' + eventId,
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      // Return observations on success
      return data;
    }, function() {
      // Return empty array on error
      return [];
    });
  },

  /**
   * Create a new observation
   * @param {object} data An object containing the event ID and all the observation attributes
   */
  addObservation: function(data) {
    // Return a promise so the requester can chain the response
    return $.ajax({
      url: '/api/observation/create',
      method: 'POST',
      dataType: 'json',
      data: data
    }).then(function(data) {
      // Return observation on success
      return data;
    }, function() {
      // Return empty array on error
      return [];
    });
  }
};

module.exports = ObservationAPI;
