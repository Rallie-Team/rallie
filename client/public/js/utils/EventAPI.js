/**
 * Getter and setter functions for interacting with the server event API endpoints
 */

var EventAPI = {

  /**
   * Get all, unfiltered events
   */
  getAllEvents: function() {
    return $.ajax({
      url: '/api/event',
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      return data;
    }, function() {
      return [];
    });
  },

  /**
   * Get all events for all non-shepherds
   */
  getAllEventsNotByShepherd: function() {
    return $.ajax({
      url: '/api/event/sheep/',
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      return data;
    }, function() {
      return [];
    });
  },

  /**
   * Get all events for a shepherd
   * @param {number} shepherdId The primary key of the user in the database
   */
  getAllEventsByShepherd: function(shepherdId) {
    return $.ajax({
      url: '/api/event/shepherd/' + shepherdId,
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      return data;
    }, function() {
      return [];
    });
  },

  /**
   * Get all events for a sheep
   * @param {number} sheepId The primary key of the user in the database
   */
  getAllEventsBySheep: function(sheepId) {
    return $.ajax({
      url: '/api/event/sheep/' + sheepId,
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      return data;
    }, function() {
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
      return data;
    }, function() {
      return [];
    });
  },

  /**
   * Create a new event
   * @param {object} data An object containing the shepherd ID and all the event attributes
   */
  addEvent: function(data) {
    return $.ajax({
      url: '/api/event/create',
      method: 'POST',
      dataType: 'json',
      data: data
    }).then(function(data) {
      return data;
    }, function() {
      return [];
    });
  },

  /**
   * Edit an event
   * @param {object} event An object containing all the event attributes
   */
  editEvent: function(event) {
    return $.ajax({
      url: '/api/event/' + event.id,
      method: 'PUT',
      dataType: 'json',
      data: event
    }).then(function(data) {
      return data;
    }, function() {
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
