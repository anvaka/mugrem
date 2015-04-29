module.exports = createLayout;
var layout4d = require('ngraph.forcelayout4d');

function createLayout(graph, options) {
  var layout = layout4d(graph, options.physics);
  var positions = Object.create(null);
  var minT = Number.POSITIVE_INFINITY, maxT = Number.NEGATIVE_INFINITY;
  var api = {
    step: step,
    getNodePosition: getNodePosition,
    getNodeColor: getNodeColor
  };
  updatePositions();

  return api;

  function step() {
    var done = layout.step();
    updatePositions();
    return done;
  }

  function getNodePosition(nodeId) {
    return positions[nodeId];
  }


  function updatePositions() {
    minT = Number.POSITIVE_INFINITY;
    maxT = Number.NEGATIVE_INFINITY;
    graph.forEachNode(updateNodePosition);
  }

  function updateNodePosition(node) {
    // I know this is not efficient at all.
    var pos = layout.getNodePosition(node.id);
    var cachedPos = positions[node.id];
    if (!cachedPos) {
      cachedPos = positions[node.id] = { x: pos.x, y: pos.y, z: pos.t };
    } else {
      cachedPos.x = pos.x;
      cachedPos.y = pos.y;
      cachedPos.z = pos.t;
    }
    if (pos.z < minT) minT = pos.z;
    if (pos.z > maxT) maxT = pos.z;
  }

  function getNodeColor(nodeId) {
    var pos = layout.getNodePosition(nodeId);
    var color = Math.round((pos.z - minT) * 255/(maxT - minT));
    var finalColor = (color << 16) | (color << 8) | color;
    return finalColor;
  }
}
