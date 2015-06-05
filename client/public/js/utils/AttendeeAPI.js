/**
 * Gets all attendees for a specific event by connecting with the Event API endpoint
 */

var AttendeesAPI = {

  /**
   * Get all shepherds for an event
   * @param {number} eventId The primary key of the event in the database
   */
  getAllShepherdsByEvent: function(eventId) {
    // console.log(eventId, 'inside of getAllAttendeesByEvent');
    return $.ajax({
      url: '/api/attendee/shepherd/' + eventId,
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      return data;
    }, function() {
      return [];
    });
  },

  /**
   * Get all sheep for an event
   * @param {number} eventId The primary key of the event in the database
   */
  getAllSheepsByEvent: function(eventId) {
    // console.log(eventId, 'inside of getAllAttendeesByEvent');
    return $.ajax({
      url: '/api/attendee/sheep/' + eventId,
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      return data;
    }, function() {
      return [];
    });
  }

};

module.exports = AttendeesAPI;
