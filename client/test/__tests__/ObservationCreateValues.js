var componentPath = '../../public/js/components/ObservationList/';
jest.dontMock(componentPath + 'ObservationCreate.js');

describe('Successfully update values on ObservationCreate form', function() {
  it('Should update value', function() {
    var React = require('react/addons');
    var ObservationCreate = require(componentPath + 'ObservationCreate.js');
    var TestUtils = React.addons.TestUtils;

    //Render ObservationCreate form in the document
    var observationCreate = TestUtils.renderIntoDocument(<ObservationCreate />);
    var observationForm = TestUtils.findRenderedDOMComponentWithClass(observationCreate, 'observationCreateForm');
    var inputs = TestUtils.scryRenderedDOMComponentsWithClass(observationCreate, 'inputBox');

    //Change the input for the observation text
    inputs[0].getDOMNode().value = 'Hi, this is an observation';

    //Simulate change to change the state
    TestUtils.Simulate.change(inputs[0].getDOMNode());
    //Expect input value to have changed
    expect(inputs[0].getDOMNode().value).toEqual('Hi, this is an observation');

  });
});