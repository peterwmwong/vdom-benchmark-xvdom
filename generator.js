! function r(e, t, n) {
  function o(i, a) {
    if (!t[i]) {
      if (!e[i]) {
        var f = "function" == typeof require && require;
        if (!a && f) return f(i, !0);
        if (s) return s(i, !0);
        var u = new Error("Cannot find module '" + i + "'");
        throw u.code = "MODULE_NOT_FOUND", u
      }
      var m = t[i] = {
        exports: {}
      };
      e[i][0].call(m.exports, function(r) {
        var t = e[i][1][r];
        return o(t ? t : r)
      }, m, m.exports, r, e, t, n)
    }
    return t[i].exports
  }
  for (var s = "function" == typeof require && require, i = 0; i < n.length; i++) o(n[i]);
  return o
}({
  1: [function(r) {
    "use strict";
    var e = r("vdom-benchmark-generator"),
      t = e.transformers,
      n = e.Generator,
      o = new n;
    o.addGroup([500],
      [
        [t.reverse],
        [t.shuffle],
        [t.insertFirst],
        [t.insertLast],
        [t.removeFirst],
        [t.removeLast],
        [t.moveFromEndToStart],
        [t.moveFromStartToEnd]
      ]),
    o.addGroup([50, 10], [
      [t.reverse, t.skip],
      [t.shuffle, t.skip],
      [t.insertFirst, t.skip],
      [t.insertLast, t.skip],
      [t.removeFirst, t.skip],
      [t.removeLast, t.skip],
      [t.moveFromEndToStart, t.skip],
      [t.moveFromStartToEnd, t.skip]
    ]),
    o.addGroup([5, 100], [
      [t.reverse, t.skip],
      [t.shuffle, t.skip],
      [t.insertFirst, t.skip],
      [t.insertLast, t.skip],
      [t.removeFirst, t.skip],
      [t.removeLast, t.skip],
      [t.moveFromEndToStart, t.skip],
      [t.moveFromStartToEnd, t.skip]
    ]),
    window.generateBenchmarkData = function() {
      return {
        units: o.generate()
      }
    }
  }, {
    "vdom-benchmark-generator": 2
  }],
  2: [function(r, e) {
    "use strict";
    var t = r("./lib/generator");
    e.exports = {
      Generator: t.Generator,
      createNode: t.createNode,
      NodeFlags: r("./lib/node_flags"),
      transformers: r("./lib/transformers")
    }
  }, {
    "./lib/generator": 3,
    "./lib/node_flags": 4,
    "./lib/transformers": 5
  }],
  3: [function(r, e) {
    "use strict";

    function t(r, e, t) {
      return void 0 === e && (e = 0), void 0 === t && (t = null), {
        key: r,
        flags: 0,
        children: t
      }
    }

    function n(r, e, o) {
      void 0 === e && (e = null), void 0 === o && (o = 0);
      var s, i = [],
        a = r[o];
      if (o === r.length - 1)
        for (s = 0; a > s; s++) i.push(t(s, 0, null));
      else
        for (s = 0; a > s; s++) i.push(t(s, 0, n(r, e, o + 1)));
      return null != e && e[o].fn(i), i
    }

    function o() {
      this.groups = []
    }
    o.prototype.addGroup = function(r, e) {
      this.groups.push({
        nodes: r,
        transformers: e
      })
    }, o.prototype.generate = function() {
      var r, e, t, o, s, i, a, f = [];
      for (r = 0; r < this.groups.length; r++)
        for (t = this.groups[r], s = n(t.nodes), a = JSON.stringify(t.nodes) + " ", e = 0; e < t.transformers.length; e++) o = t.transformers[e], i = n(t.nodes, o), f.push({
          name: a + JSON.stringify(o.map(function(r) {
            return r.name
          })),
          data: {
            a: s,
            b: i
          }
        });
      return f
    }, e.exports = {
      Generator: o,
      createNode: t
    }
  }, {}],
  4: [function(r, e) {
    "use strict";
    e.exports = {
      component: 1,
      style: 2,
      attribute: 4,
      classes: 8
    }
  }, {}],
  5: [function(r, e) {
    "use strict";
    var t = r("./generator").createNode,
      n = {
        name: "skip",
        fn: function() {}
      },
      o = {
        name: "reverse",
        fn: function(r) {
          r.reverse()
        }
      },
      s = {
        name: "insertFirst",
        fn: function(r) {
          r.unshift(t(r.length))
        }
      },
      i = {
        name: "insertLast",
        fn: function(r) {
          r.push(t(r.length))
        }
      },
      a = {
        name: "removeFirst",
        fn: function(r) {
          r.shift()
        }
      },
      f = {
        name: "removeLast",
        fn: function(r) {
          r.pop()
        }
      },
      u = {
        name: "moveFromEndToStart",
        fn: function(r) {
          r.unshift(r.pop())
        }
      },
      m = {
        name: "moveFromStartToEnd",
        fn: function(r) {
          r.push(r.shift())
        }
      },
      p = {
        name: "shuffle",
        fn: function(r) {
          for (var e, t, n = r.length; 0 !== n;) e = Math.floor(Math.random() * n--), t = r[n], r[n] = r[e], r[e] = t
        }
      };
    e.exports = {
      skip: n,
      reverse: o,
      insertFirst: s,
      insertLast: i,
      removeFirst: a,
      removeLast: f,
      moveFromEndToStart: u,
      moveFromStartToEnd: m,
      shuffle: p
    }
  }, {
    "./generator": 3
  }]
}, {}, [1]);
