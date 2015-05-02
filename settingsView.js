var exdat = require('exdat');
var createDimensionMapping = require('./lib/dimensionMapping.js');
module.exports = createSettingsView;

function createSettingsView(layout, renderer, dim) {
  var gui = new exdat.GUI();
  createDimensionMapping(gui, layout, dim);
  var folder = gui.addFolder('View settings');
  var model = { color: 0x8e8e8e };
  folder.addColor(model, 'color').name('Background color').onChange(updateClearColor);
  folder.open();

  function updateClearColor(color) {
    renderer.clearColor(color);
  }
}

