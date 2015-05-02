module.exports = createLayout;
var layout4d = require('ngraph.forcelayout.nd');

function createLayout(graph, options) {
  var layout = layout4d(graph, options.physics);
  var positions = Object.create(null);
  var minT = Number.POSITIVE_INFINITY, maxT = Number.NEGATIVE_INFINITY;
  var config = {};
  var api = {
    step: step,
    getNodePosition: getNodePosition,
    getNodeColor: getNodeColor,
    config: setConfig
  };

  updatePositions();

  return api;

  function setConfig(newConfig) {
    config = newConfig;
  }

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
    if (config.x === undefined) {
      config.x = 0;
      config.y = 1;
      config.z = 2;
    }
    var pos = layout.getNodePosition(node.id);
    var cachedPos = positions[node.id];
    if (!cachedPos) {
      cachedPos = positions[node.id] = { x: pos[config.x], y: pos[config.y], z: pos[config.z] };
    } else {
      cachedPos.x = pos[config.x];
      cachedPos.y = pos[config.y];
      cachedPos.z = pos[config.z];
    }

    if (config.t > -1) {
      if (pos[config.t] < minT) minT = pos[config.t];
      if (pos[config.t] > maxT) maxT = pos[config.t];
    }
  }

  function getNodeColor(nodeId) {
    if (config.t < 0) return 0xffffff;

    var pos = layout.getNodePosition(nodeId);
    var color = Math.round((pos[config.t] - minT) * 255/(maxT - minT));
    var finalColor = (color << 16) | (color << 8) | color;
    return finalColor;
  }
}
