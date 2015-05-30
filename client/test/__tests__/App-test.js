// __tests__/App-test.js
var componentPath = '../../public/js/components/'
jest.dontMock(componentPath + 'App.js');
describe('App component', function () {
  it('App', function() {
    var React = require('react/addons');
    var App = require(componentPath + 'App.js');
    var TestUtils = React.addons.TestUtils;

    expect(true).toEqual(true);

    /**
     * Example rendering of a test element
     *
     *  // Render App in the document
     *  var app = TestUtils.renderIntoDocument(
     *    <App />
     *  );
     *
     *  // Verify that mode is 'sheep' by default
     *  var mode = TestUtils.findRenderedDOMComponentWithTag(app, 'mode');
     *  expect(mode.getDOMNode().textContext).toEqual('sheep');
     *
     *  // Simpulate a click and verify that is now a shepherd
     *  var input = TestUtils.findRenderedDOMComponentWithTag(app, 'input');
     *  TestUtils.Simpulate.change(input);
     *  expect(mode.getDOMNode().textContext).toEqual('shepherd');
     */
  });
});