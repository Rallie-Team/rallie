/**
 * Getter and setter functions for interacting with the server event API endpoints
 */

var EventAPI = {
  /**
   * Get all events for a sheep
   */
  getAllEventsNotByShepherd: function() {
    // Return a promise so the requester can chain the response
    return $.ajax({
      url: '/api/event/sheep/',
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      // console.log('sheep events returned', data);
      // Return events on success
      return data;
    }, function() {
      // Return empty array on error
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
      url: '/api/event/shepherd/' + shepherdId,
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
   * @param {object} data An object containing the shepherd ID and all the event attributes
   */
  addEvent: function(data) {
    // Return a promise so the requester can chain the response
    return $.ajax({
      url: '/api/event/create',
      method: 'POST',
      dataType: 'json',
      data: data
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
  },

  addParticipant: function(event, sheep) {
    return $.ajax({
      url: 'api/event/add-participant/' + event.id,
      method: 'POST',
      dataType: 'json',
      data: sheep
    }).then(function (data){
      return data;
    }, function() {
      return [];
    });
  },

  removeParticipant: function(event, sheep) {
    return $.ajax({
      url: 'api/event/remove-participant/' + event.id,
      method: 'DELETE',
      dataType: 'json',
      data: sheep
    }).then(function (data){
      return data;
    }, function() {
      return [];
    });
  }

};

module.exports = EventAPI;
