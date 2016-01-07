'use strict';

var benchmark = require('vdom-benchmark-base');
var xvdom = require('xvdom');
xvdom = window.xvdom || xvdom;

var NAME = 'xvdom';
var VERSION = '0.0.1-alpha';
var createDynamic = xvdom.createDynamic;
var renderInstance = xvdom.renderInstance;
var rerender = xvdom.rerender;

var _xvdomSpec2 = {
  c: function(inst) {
    var _n = document.createElement("span");

    _n.appendChild(createDynamic(inst.b, inst, "c", "d"));

    return _n;
  },
  u: function(inst, pInst) {
    if (inst.b !== pInst.b) {
      pInst.c(inst.b, pInst.b, pInst.d, pInst, "c", "d");
      pInst.b = inst.b;
    }
  },
  recycled: []
};

var _xvdomSpec = {
  c: function(inst) {
    var _n = document.createElement("div");

    _n.appendChild(createDynamic(inst.b, inst, "c", "d"));

    return _n;
  },
  u: function(inst, pInst) {
    if (inst.b !== pInst.b) {
      pInst.c(inst.b, pInst.b, pInst.d, pInst, "c", "d");
      pInst.b = inst.b;
    }
  },
  recycled: []
};

function renderChildren(nodes) {
  var children = [];
  var i;
  var n;

  for (i = 0; i < nodes.length; i++) {
    n = nodes[i];
    if(n.children !== null) {
      children.push({
        $s: _xvdomSpec,
        $n: null,
        b: renderChildren(n.children),
        c: null,
        d: null,
        key: n.key,
        next: null
      });
    } else {
      children.push({
        $s: _xvdomSpec2,
        $n: null,
        b: "" + n.key,
        c: null,
        d: null,
        key: n.key,
        next: null
      });
    }
  }

  return children;
}

function renderRoot(children){
  return {
    $s: _xvdomSpec,
    $n: null,
    b: renderChildren(children),
    c: null,
    d: null,
    key: null,
    next: null
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
  renderedNode = renderInstance(renderRoot(this.a));
  this.container.appendChild(renderedNode);
};

BenchmarkImpl.prototype.update = function() {
  rerender(renderedNode, renderRoot(this.b));
};

document.addEventListener('DOMContentLoaded', function(e) {
  benchmark(NAME, VERSION, BenchmarkImpl);
}, false);
