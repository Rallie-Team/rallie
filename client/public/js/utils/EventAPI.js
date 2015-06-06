/**
 * Getter and setter functions for interacting with the server event API endpoints
 */

var EventAPI = {

  /**
   * Get all, unfiltered events, and return event objects in an array
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
   * Return all events for non-shepherds in an array of event objects
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
   * Return an array of events for a given shepherd, based on the ShepherdEvent join table
   * @param {number} shepherdId The primary key of the user in User table, while in shepherd mode
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
   * Return an array of events for a given sheep, based on the SheepEvent join table
   * @param {number} sheepId The primary key of the user in User table, while in sheep mode
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
   * Return a specific event object, given an event ID
   * @param {number} eventId The primary key of the event in the Event table
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
   * Adds a new event to the Event table and associates with a given shepherd
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
   * Edits an event in the Event table
   * @param {object} event Current event object that will be modified
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

  /**
   * Adds a sheep user participant to an event by adding an entry with the event and the sheep user
   * to the SheepEvent join table
   * @param {object} event Current event, only using event.id
   * @param {object} sheep Current user in sheep mode viewing the event
   */
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

  /**
   * Removes a sheep user participant from an event by removing an entry with the event and 
   * the sheep user from the SheepEvent join table
   * @param {object} event Current event, only using event.id
   * @param {object} sheep Current user in sheep mode viewing the event
   */
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
