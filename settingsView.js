var exdat = require('exdat');
var createDimensionMapping = require('./lib/dimensionMapping.js');
module.exports = createSettingsView;

function createSettingsView(layout, renderer, dim) {
  var gui = new exdat.GUI();
  createDimensionMapping(gui, layout, dim);
  var folder = gui.addFolder('View settings');
  var model = {
    color: 0x8e8e8e,
    startColor: 0x000000,
    endColor: 0xffffff
  };
  folder.addColor(model, 'color').name('Background color').onChange(updateClearColor);
  folder.addColor(model, 'startColor').name('Fartherst color').onChange(updateNodeColor);
  folder.addColor(model, 'endColor').name('Nearest color').onChange(updateNodeColor);
  folder.open();

  function updateClearColor(color) {
    renderer.clearColor(color);
  }

  function updateNodeColor() {
    layout.setColorRange(model.startColor, model.endColor);
  }
}

