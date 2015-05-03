# mugrem

This is just an experiment: I want to embed higher dimensional graphs into
lower dimension. E.g. layout graph with 4D algorithme, use first three dimensions
to render graph in `(X, Y, Z)` space, and use fourth dimension to set color of
a node.

# examples

For four-dimensional force based layout is computed for graphs. Then graphs are
rendered in 3D, the fourth dimension is used as a node color. The smaller the
numerical value of the fourth coordinate - the darker is the node.

In the 5-dimensional case, only four cooridnates are used.

* `HB/bcsstk26` graph [in 4d](https://anvaka.github.io/mugrem/index.html?dim=4&url=//s3.amazonaws.com/yasiv_uf/out/HB/bcsstk26/index.js):

[![4d graph layout of HB/bcsstk26](http://i.imgur.com/CBxNtrG.gif)](https://anvaka.github.io/mugrem/index.html?dim=4&url=//s3.amazonaws.com/yasiv_uf/out/HB/bcsstk26/index.js)

* Same graph, `HB/bcsstk26` [in 5d](https://anvaka.github.io/mugrem/index.html?dim=5&url=//s3.amazonaws.com/yasiv_uf/out/HB/bcsstk26/index.js)

[![5d graph layout of HB/bcsstk26](http://i.imgur.com/dGinbM7.gif)](https://anvaka.github.io/mugrem/index.html?dim=5&url=//s3.amazonaws.com/yasiv_uf/out/HB/bcsstk26/index.js)

* `TOKAMAK/utm300` graph [in 4d](https://anvaka.github.io/mugrem/index.html?dim=4&url=//s3.amazonaws.com/yasiv_uf/out/TOKAMAK/utm300/index.js)

[![4d layout of TOKAMAK/utm300](http://i.imgur.com/HWnAPHf.gif)](https://anvaka.github.io/mugrem/index.html?dim=4&url=//s3.amazonaws.com/yasiv_uf/out/TOKAMAK/utm300/index.js)

* Same graph. `TOKAMAK/utm300` [in 5d](https://anvaka.github.io/mugrem/index.html?dim=5&url=//s3.amazonaws.com/yasiv_uf/out/TOKAMAK/utm300/index.js)

[![4d layout of TOKAMAK/utm300](http://i.imgur.com/wZ6z1eI.gif)](https://anvaka.github.io/mugrem/index.html?dim=4&url=//s3.amazonaws.com/yasiv_uf/out/TOKAMAK/utm300/index.js)

Once the graph is rendered in 5d, we can switch between two available extra dimensions,
without affecting node placement. Here is what I found for `HB/bcsstk26`:

![switch](http://i.imgur.com/DaW4djb.gif)

As you can see, the swith affects different parts of a graph, which means
that nodes that are closer to us in the fourth dimension are farther from us
in the fifth, and vice versa.

The graphs are taken from the [UFL dataset](http://www.cise.ufl.edu/research/sparse/matrices/).

# install

With [npm](https://npmjs.org) do:

```
npm install mugrem
```

# license

MIT
