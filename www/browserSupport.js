// Generated by CoffeeScript 1.6.3
(function() {
  var BS, DEL, DOWN, ENTER, LEFT, RIGHT, TAB, UP, baseElements, baseStrokeWidth, createNode, getMaxStrokeWidth, getSvgElement, lazy, lz, primSvgMeasure, resolve, root, rz, svgBetterMeasure, svgMeasure, svgMeasureText, textNode, transformStrokeWidth, transformedPoint, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = root = module.exports = require('./base'), resolve = _ref.resolve, lazy = _ref.lazy;

  rz = resolve;

  lz = lazy;

  BS = 8;

  ENTER = 13;

  DEL = 46;

  TAB = 9;

  LEFT = 37;

  UP = 38;

  RIGHT = 39;

  DOWN = 40;

  textNode = function(text) {
    return document.createTextNode(text);
  };

  getSvgElement = function(id) {
    var el, svg;
    if ((el = document.getElementById(id))) {
      return el;
    } else {
      svg = createNode("<svg id='HIDDEN_SVG' xmlns='http://www.w3.org/2000/svg' version='1.1' style='top: -100000px; position: absolute'><text id='HIDDEN_TEXT'>bubba</text></svg>");
      document.body.appendChild(svg);
      return document.getElementById(id);
    }
  };

  svgMeasureText = function(text) {
    return function(style) {
      return function(f) {
        var bx, txt;
        txt = getSvgElement('HIDDEN_TEXT');
        if (rz(style)) {
          txt.setAttribute('style', rz(style));
        }
        txt.lastChild.textContent = rz(text);
        bx = txt.getBBox();
        return rz(f)(lz(bx.width))(lz(bx.height));
      };
    };
  };

  transformedPoint = function(pt, x, y, ctm, ictm) {
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(ctm).matrixTransform(ictm);
  };

  svgMeasure = function(content) {
    return primSvgMeasure(content, baseStrokeWidth);
  };

  svgBetterMeasure = function(content) {
    return primSvgMeasure(content, transformStrokeWidth);
  };

  primSvgMeasure = function(content, transformFunc) {
    return function(f) {
      var bbox, g, pad, svg;
      svg = createNode("<svg xmlns='http://www.w3.org/2000/svg' version='1.1' style='top: -100000'><g>" + (content()) + "</g></svg>");
      document.body.appendChild(svg);
      g = svg.firstChild;
      bbox = g.getBBox();
      pad = getMaxStrokeWidth(g, g, svg, transformFunc);
      document.body.removeChild(svg);
      return rz(f)(lz(bbox.x - Math.ceil(pad / 2)))(lz(bbox.y - Math.ceil(pad / 2)))(lz(bbox.width + pad))(lz(bbox.height + pad));
    };
  };

  baseElements = ['path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon'];

  getMaxStrokeWidth = function(el, base, svg, transformFunc) {
    var _ref1, _ref2;
    if (_ref1 = base.nodeName, __indexOf.call(baseElements, _ref1) >= 0) {
      svg.setAttribute('width', (_ref2 = getComputedStyle(base).strokeWidth) != null ? _ref2 : '0', svg);
      return transformFunc(el, svg.width.baseVal.value);
    } else if (base.nodeName === 'use') {
      return getMaxStrokeWidth(base, base.instanceRoot.correspondingElement, svg, transformFunc);
    } else if (base.nodeName === 'g') {
      return foldLeft((function(v, n) {
        return Math.max(v, getMaxStrokeWidth(n, n, svg, transformFunc));
      }), 0, el.childNodes);
    } else {
      return 0;
    }
  };

  baseStrokeWidth = function(el, w) {
    return w;
  };

  transformStrokeWidth = function(el, w) {
    var ctm, tp1, tp2, x, y;
    if (w === 0) {
      return 0;
    } else {
      ctm = el.getScreenCTM();
      tp1 = transformedPoint(pt, bx.x - Math.ceil(w), bx.y - Math.ceil(w), ctm, isctm);
      tp2 = transformedPoint(pt, bx.x + bx.width + Math.ceil(w), bx.y + bx.height + Math.ceil(w), ctm, isctm);
      x = tp2.x - tp1.x;
      y = tp2.y - tp1.y;
      return Math.sqrt(x * x + y * y);
    }
  };

  createNode = function(txt) {
    var scratch;
    scratch = document.createElement('DIV');
    scratch.innerHTML = txt;
    return scratch.firstChild;
  };

  root.svgMeasure = svgMeasure;

  root.svgMeasureText = svgMeasureText;

  root.createNode = createNode;

  root.ENTER = ENTER;

  root.BS = BS;

  root.DEL = DEL;

  root.TAB = TAB;

  root.LEFT = LEFT;

  root.UP = UP;

  root.RIGHT = RIGHT;

  root.DOWN = DOWN;

  root.textNode = textNode;

}).call(this);

/*
//@ sourceMappingURL=browserSupport.map
*/
