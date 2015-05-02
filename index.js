var createSettingsView = require('./settingsView.js');
var getGraph = require('./lib/getGraph.js');
var layout4 = require('./lib/pseudo4dlayout.js');

var query = require('query-string').parse(window.location.search.substring(1));
var dim = parseInt(query.dim, 10);
if (isNaN(dim) || dim < 2) {
  dim = 3;
}

getGraph(query, render);

function render(graph) {
  var renderer = require('ngraph.pixel')(graph, {
    createLayout: layout4,
    clearColor: 0x8e8e8e,
    physics: {
      dimension: dim
    }
  });

  var layout = renderer.layout();
  createSettingsView(layout, dim);

  renderer.beforeFrame(setColors);

  function setColors() {
    graph.forEachNode(setSingleNodeColor);
    graph.forEachLink(setSingleLinkColor);
  }

  function setSingleNodeColor(node) {
    renderer.nodeColor(node.id, layout.getNodeColor(node.id));
  }

  function setSingleLinkColor(link) {
    var fromColor = layout.getNodeColor(link.fromId);
    var toColor = layout.getNodeColor(link.toId);
    renderer.linkColor(link.id, fromColor, toColor);
  }
}
