/**
 * Getter and setter functions for interacting with the server event API endpoints
 */

var EventAPI = {
  /**
   * Get all events
   */
  getAllEvents: function() {
    // Return a promise so the requester can chain the response
    return $.ajax({
      url: '/api/event',
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      // On success, return event data
      return data;
    }, function() {
      // On error, return empty array
      return [];
    });
  },

  /**
   * Get all events for a shepherd
   * @param {number} shepherdId The primary key of the user in the database
   */
  getAllEventsByShepherd: function(shepherdId) {
    // Return a promise so the requester can chain the response
    return $.ajax({
      url: '/api/event/user/' + shepherdId,
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      // Return events on success
      return data;
    }, function() {
      // Return empty array on error
      return [];
    });
  },

  /**
   * Get a specific event by event ID
   * @param {number} eventId The primary key of the event in the database
   */
  getEvent: function(eventId) {
    return $.ajax({
      url: '/api/event/' + eventId,
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      // Return event on success
      return data;
    }, function() {
      // Return empty array on error
      return [];
    });
  },

  /**
   * Create a new event
   * @param {object} event An object containing all the event attributes
   */
  addEvent: function(event) {
    // Return a promise so the requester can chain the response
    return $.ajax({
      url: '/api/event/create',
      method: 'POST',
      dataType: 'json',
      data: event
    }).then(function(data) {
      // Return event on success
      return data;
    }, function() {
      // Return empty array on error
      return [];
    });
  },

  /**
   * Edit an event
   * @param {object} event An object containing all the event attributes
   */
  editEvent: function(event) {
    // Return a promise so the requester can chain the response
    return $.ajax({
      url: '/api/event/' + event.id,
      method: 'PUT',
      dataType: 'json',
      data: event
    }).then(function(data) {
      // Return updated event on success
      return data;
    }, function() {
      // Return empty array on error
      return [];
    });
  }
};

module.exports = EventAPI;
