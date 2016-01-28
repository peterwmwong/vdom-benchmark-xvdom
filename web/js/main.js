'use strict';

var benchmark = require('vdom-benchmark-base');
var xvdom = require('xvdom');
var render = xvdom.render;
var rerender = xvdom.rerender;
var createDynamic = xvdom.createDynamic;

var NAME = 'xvdom';
var VERSION = '0.0.1-alpha';

var _xvdomSpec2 = {
  c: function(inst) {
    var _n = document.createElement("span");

    _n.appendChild(createDynamic(true, _n, inst.b, inst, "c", "d"));

    return _n;
  },
  u: function(inst, pInst) {
    if (inst.b !== pInst.b) {
      pInst.b = pInst.c(true, inst.b, pInst.b, pInst.d, pInst, "c", "d");
    }
  },
  r: {}
};

var _xvdomSpec = {
  c: function(inst) {
    var _n = document.createElement("div");

    _n.appendChild(createDynamic(true, _n, inst.b, inst, "c", "d"));

    return _n;
  },
  u: function(inst, pInst) {
    if (inst.b !== pInst.b) {
      pInst.b = pInst.c(true, inst.b, pInst.b, pInst.d, pInst, "c", "d");
    }
  },
  r: {}
};

function renderChildren(nodes) {
  var length = nodes.length;
  var children = new Array(length);
  var i = 0;
  var n, key;

  while(i < length) {
    n = nodes[i];
    key = n.key;
    children[i++] =
      n.children ? renderRoot(n.children, key) : {
        $s: _xvdomSpec2,
        $n: null,
        b: key,
        c: null,
        d: null,
        key: key
      };
  }

  return children;
}

function renderRoot(children, key){
  return {
    $s: _xvdomSpec,
    $n: null,
    b: renderChildren(children),
    c: null,
    d: null,
    key: key
  };
}

function BenchmarkImpl(container, a, b) {
  this.container = container;
  this.a = a;
  this.b = b;
  this._root = null;
}

BenchmarkImpl.prototype.setUp = function() {};

var renderedNode;

BenchmarkImpl.prototype.tearDown = function() {
  xvdom.unmount(renderedNode);
};

BenchmarkImpl.prototype.render = function() {
  renderedNode = render(renderRoot(this.a, 0));
  this.container.appendChild(renderedNode);
};

BenchmarkImpl.prototype.update = function() {
  rerender(renderedNode, renderRoot(this.b, 0));
};

document.addEventListener('DOMContentLoaded', function(e) {
  benchmark(NAME, VERSION, BenchmarkImpl);
}, false);
