module.exports = createMapping;
function createMapping(gui, layout, dim) {
  var folder = gui.addFolder('Layout dimensions mapping');
  var possibleMapping = ['x axis', 'y axis', 'z axis', 'node color', 'none'];
  var none = possibleMapping[4];
  var model = {};
  var controllers = {};
  for (var i = 0; i < dim; ++i) {
    if (i < 4) {
      model[i] = possibleMapping[i];
    } else {
      model[i] = none;
    }
    controllers[i] = folder.add(model, i, possibleMapping).name(i + ' dimension').onChange(changeMapping);
  }

  reconfigureLayout(model);
  folder.open();

  function changeMapping(newValue) {
    toggle(newValue, this.property, this.initialValue);
    this.initialValue = newValue;
    reconfigureLayout(model);
    gui.update();
  }

  function toggle(value, currentProperty, swapWith) {
    for (var key in model) {
      if (model.hasOwnProperty(key)) {
        if (model[key] === value && key != currentProperty) {
          model[key] = swapWith;
          controllers[key].initialValue = swapWith;
        }
      }
    }
  }

  function reconfigureLayout(model) {
    layout.config(toFlatMap(model));
  }

  function toFlatMap(model) {
    var keys = Object.keys(model);
    var map = {
      x: get('x axis'),
      y: get('y axis'),
      z: get('z axis'),
      t: get('node color', -1)
    };

    return map;

    function get(name, defaultValue) {
      defaultValue = defaultValue !== undefined ? defaultValue : 0;
      return keys.filter(function(key) {return model[key] === name; })[0] || defaultValue;
    }
  }
}
