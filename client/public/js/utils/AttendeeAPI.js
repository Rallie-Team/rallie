/**
 * Getter and setter functions for interacting with the server event API endpoints
 */

var AttendeesAPI = {
  /**
   * Get all attendees for an event
   * @param {number} eventId The primary key of the event in the database
   */
  getAllAttendeesByEvent: function(eventId) {
    console.log(eventId, 'inside of getAllAttendeesByEvent');
    // Return a promise so the requester can chain the response
    return $.ajax({
      url: '/api/attendees/' + eventId,
      method: 'GET',
      dataType: 'json'
    }).then(function(data) {
      console.log('AttendeeAPI', data);
      // Return attendees on success
      return data;
    }, function() {
      // Return empty array on error
      return [];
    });
  }

};

module.exports = AttendeesAPI;
