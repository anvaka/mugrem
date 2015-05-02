var http = require('./http.js');

module.exports = getGraph;

function getGraph(query, cb) {
  if (query.graph) {
    setTimeout(useGenerrator, 0);
  } else {
    getGraphFromUrl(query, cb);
  }

  function useGenerrator() {
    cb(getGraphFromQueryString(query));
  }
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

function getGraphFromUrl(query, cb) {
  var urlIsValid = query.url && query.url.match(/^(https?:)\/\/s3.amazonaws.com\/yasiv_uf\/out\//);
  var url = (urlIsValid && query.url) || '//s3.amazonaws.com/yasiv_uf/out/HB/494_bus/index.js';

  http.get(url, function (err, data) {
    if (err) return;
    cb(require('ngraph.serialization/mtx').loadFromObject(data));
  });
}
