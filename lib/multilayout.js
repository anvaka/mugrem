module.exports = createLayout;
var layout4d = require('ngraph.forcelayout.nd');

function createLayout(graph, options) {
  var layout = layout4d(graph, options.physics);
  var positions = Object.create(null);
  var minT = Number.POSITIVE_INFINITY, maxT = Number.NEGATIVE_INFINITY;
  var minColor = 0;
  var maxColor = 0xffffff;
  var config = {};
  var api = {
    step: step,
    getNodePosition: getNodePosition,
    getNodeColor: getNodeColor,
    config: setConfig,
    setColorRange: setColorRange
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
    var p = (pos[config.t] - minT)/(maxT - minT);
    var sr = (minColor >> 16) & 0xff;
    var sg = (minColor >>  8) & 0xff;
    var sb = (minColor      ) & 0xff;

    var dr = (maxColor >> 16) & 0xff;
    var dg = (maxColor >>  8) & 0xff;
    var db = (maxColor      ) & 0xff;
    var r = sr * p + dr * (1 - p);
    var g = sg * p + dg * (1 - p);
    var b = sb * p + db * (1 - p);
    var finalColor = (r << 16) | (g << 8) | b;
    return finalColor;
  }

  function setColorRange(min, max) {
    minColor = min;
    maxColor = max;
  }
}
