// __tests__/App-test.js
var componentPath = '../../public/js/components/EventDetail/'
jest.dontMock(componentPath + 'EventCreate.js');


describe('Testing EventCreate form submission', function() {
  it ('should submit successfully', function(){
    var React = require('react/addons');
    var EventCreate = require(componentPath + 'EventCreate.js');
    var TestUtils = React.addons.TestUtils;
    
    //Render EventCreate form in the document
    var eventCreate = TestUtils.renderIntoDocument(<EventCreate />);
    var eventForm = TestUtils.findRenderedDOMComponentWithClass(eventCreate, 'eventCreateForm');

    var inputs = TestUtils.scryRenderedDOMComponentsWithClass(eventCreate, 'inputBox');
    
    //Mock the event create ._save method
    eventCreate._save = jest.genMockFunction();

    //Get the input nodes
    var nameNode = inputs[0].getDOMNode();
    var locationNode = inputs[1].getDOMNode();

    //Change the input for the event name
    nameNode.value = 'Sample Event Name';

    //Simulate change to change the state
    TestUtils.Simulate.change(nameNode);
    expect(nameNode.value).toEqual('Sample Event Name');

    //Change the input for the location
    locationNode.value = 'Sample location';

    //Simulate change to change the state
    TestUtils.Simulate.change(locationNode);
    expect(locationNode.value).toEqual('Sample location');

    //Simulate form submission
    TestUtils.Simulate.submit(eventForm);
    //Expect the ._save method to have been called post submission
    expect(eventCreate._save).toBeCalled();

  });
});
