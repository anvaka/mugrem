module.exports = createLayout;
var layout3d = require('ngraph.forcelayout3d');

function createLayout(graph, options) {
  var layout = layout3d(graph, options.physics);
  var positions = Object.create(null);
  var minZ = Number.POSITIVE_INFINITY, maxZ = Number.NEGATIVE_INFINITY;
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
    minZ = Number.POSITIVE_INFINITY;
    maxZ = Number.NEGATIVE_INFINITY;
    graph.forEachNode(updateNodePosition);
  }

  function updateNodePosition(node) {
    // I know this is not efficient at all.
    var pos = layout.getNodePosition(node.id);
    var cachedPos = positions[node.id];
    if (!cachedPos) {
      cachedPos = positions[node.id] = { x: pos.x, y: pos.y, z: 0 };
    } else {
      cachedPos.x = pos.x;
      cachedPos.y = pos.y;
    }
    if (pos.z < minZ) minZ = pos.z;
    if (pos.z > maxZ) maxZ = pos.z;
  }

  function getNodeColor(nodeId) {
    var pos = layout.getNodePosition(nodeId);
    var color = Math.round((pos.z - minZ) * 255/(maxZ - minZ));
    var finalColor = (color << 16) | (color << 8) | color;
    return finalColor;
  }
}
