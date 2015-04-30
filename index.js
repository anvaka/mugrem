var query = require('query-string').parse(window.location.search.substring(1));
var layout4 = require('./lib/pseudo4dlayout.js');

var graph = getGraphFromQueryString(query);
var dim = parseInt(query.dim, 10);
if (isNaN(dim) || dim < 2) {
  dim = 3;
}
var renderer = require('ngraph.pixel')(graph, {
  createLayout: layout4,
  physics: {
    dimension: dim
  }
});

var layout = renderer.layout();

renderer.beforeFrame(setNodeColors);

function setNodeColors() {
  graph.forEachNode(setSingleNodeColor);
}

function setSingleNodeColor(node) {
  renderer.nodeColor(node.id, layout.getNodeColor(node.id));
}

function getGraphFromQueryString(query) {
   var graphGenerators = require('ngraph.generators');
  var createGraph = graphGenerators[query.graph] || graphGenerators.grid;
  return createGraph(getNumber(query.n), getNumber(query.m), getNumber(query.k));
}

function getNumber(string, defaultValue) {
  var number = parseFloat(string);
  return (typeof number === 'number') && !isNaN(number) ? number : (defaultValue || 10);
}
