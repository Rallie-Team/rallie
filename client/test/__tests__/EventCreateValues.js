var componentPath = '../../public/js/components/EventDetail/';
jest.dontMock(componentPath + 'EventCreate.js');

describe('Successfully update values on EventCreate form', function() {
  it('Should update value', function() {
    var React = require('react/addons');
    var EventCreate = require(componentPath + 'EventCreate.js');
    var TestUtils = React.addons.TestUtils;

    //Render EventCreate form in the document
    var eventCreate = TestUtils.renderIntoDocument(<EventCreate />);
    var eventForm = TestUtils.findRenderedDOMComponentWithClass(eventCreate, 'eventCreateForm');
    var inputs = TestUtils.scryRenderedDOMComponentsWithClass(eventCreate, 'inputBox');

    //Change the input for the event name
    inputs[0].getDOMNode().value = 'Sample Event Name';

    //Simulate change to change the state
    TestUtils.Simulate.change(inputs[0].getDOMNode());
    expect(inputs[0].getDOMNode().value).toEqual('Sample Event Name');

    //Change the input for the location
    inputs[1].getDOMNode().value = 'Sample location';

    //Simulate change to change the state
    TestUtils.Simulate.change(inputs[1].getDOMNode());
    //Expect input value to have changed
    expect(inputs[1].getDOMNode().value).toEqual('Sample location');

  });
});