var React = require('react/addons');
var expect = require('chai').expect;
var App = require('../../public/js/components/app');
var TestUtils = React.addons.TestUtils;

describe('App Component', function () {
  var appComponent;

  before('Render and locate element', function () {
    // shallowRenderer is a component of React that lets you 
    // isolate the rendering of an individual component
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<App />);
    appComponent = shallowRenderer.getRenderOutput();

    // renders the App using jsdom
    // var renderedComponent = TestUtils.renderIntoDocument(<App />);
    // var h1Component = TestUtils.findRenderedDOMComponentWithTag(
    //   renderedComponent,
    //   'h1'
    // );
    // this.h1Element = h1Component.getDOMNode();
  });

  it('should have a div container', function () {
    expect(appComponent.type).to.equal('div');
  });

  it('should have a h1 tag with "Joseki"', function () {
    expect(appComponent.props.children).to.contain(<h1>Joseki</h1>);
  });

});
