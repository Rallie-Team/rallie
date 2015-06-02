/**
 * Getter and setter functions for interacting with the server event API endpoints
 */

var AttendeesAPI = {
  /**
   * Get all attendees for an event
   * @param {number} eventId The primary key of the event in the database
   */
  getAllShepherdsByEvent: function(eventId) {
    // console.log(eventId, 'inside of getAllAttendeesByEvent');
    // Return a promise so the requester can chain the response
    return $.ajax({
      url: '/api/attendee/shepherd/' + eventId,
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      // console.log('ShepherdAPI', data);
      // Return attendees on success
      return data;
    }, function() {
      // Return empty array on error
      return [];
    });
  },

   getAllSheepsByEvent: function(eventId) {
    // console.log(eventId, 'inside of getAllAttendeesByEvent');
    // Return a promise so the requester can chain the response
    return $.ajax({
      url: '/api/attendee/sheep/' + eventId,
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      // console.log('SheepAPI', data);
      // Return attendees on success
      return data;
    }, function() {
      // Return empty array on error
      return [];
    });
  }


};

module.exports = AttendeesAPI;
