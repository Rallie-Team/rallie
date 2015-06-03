var componentPath = '../../public/js/components/';
jest.dontMock(componentPath + 'ObservationCreate.js');

describe('Testing ObservationCreate form submission', function() {
  it('Should submit successfully', function() {
    var React = require('react/addons');
    var ObservationCreate = require(componentPath + 'ObservationCreate.js');
    var TestUtils = React.addons.TestUtils;

    //Render ObservationCreate form in the document
    var observationCreate = TestUtils.renderIntoDocument(<ObservationCreate />);
    var observationForm = TestUtils.findRenderedDOMComponentWithClass(observationCreate, 'observationCreateForm');
    var inputs = TestUtils.scryRenderedDOMComponentsWithClass(observationCreate, 'inputBox');

    //Mock the ._save function for the form
    observationCreate._save = jest.genMockFunction();

    //Change the input for the observation text
    inputs[0].getDOMNode().value = 'Hi, this is an observation';

    //Simulate change to change the state
    TestUtils.Simulate.change(inputs[0].getDOMNode());
    expect(inputs[0].getDOMNode().value).toEqual('Hi, this is an observation');

    //Simulate form submission
    TestUtils.Simulate.submit(observationForm);
    //Expect the _save method to have been called post submission
    expect(observationCreate._save).toBeCalled();

  });
});