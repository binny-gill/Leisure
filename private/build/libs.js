// Generated by CoffeeScript 1.9.3
(function() {
  var k, root, v;

  root = (typeof window !== "undefined" && window !== null ? window : global).Leisure;

  for (k in Org) {
    v = Org[k];
    root[k] = v;
  }

  root.yaml = Yaml;

}).call(this);

//# sourceMappingURL=libs.js.map
