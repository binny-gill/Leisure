// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  define(['./base', './ast', './runtime', './gen', './eval', './org', './transaction'], function(Base, Ast, Runtime, Gen, Eval, Org, Transaction) {
    var Monad2, Nil, Node, _false, _identity, _true, _unit, acons, baseElements, baseStrokeWidth, bind, collabId, cons, createNode, currentDataChange, defaultEnv, defaultEnvWithData, define, dispatchCollaborative, doPartial, endMonitor, envData, evalLeisure, foldLeft, getMaxStrokeWidth, getSvgElement, getType, getValue, isNil, isPartial, jsonConvert, lazy, lc, left, lz, makeHamt, makeSyncMonad, newConsFrom, none, parseCodeAttributes, partialCall, primFoldLeft, primSvgMeasure, ref, resolve, right, root, runMonad2, rz, setValue, some, startMonitor, svgBetterMeasure, svgMeasure, svgMeasureText, transformStrokeWidth, unescapePresentationHtml;
    ref = root = Ast, define = ref.define, getType = ref.getType, cons = ref.cons, unescapePresentationHtml = ref.unescapePresentationHtml, isNil = ref.isNil, isPartial = ref.isPartial, partialCall = ref.partialCall, doPartial = ref.doPartial, Nil = ref.Nil;
    Node = Base.Node, resolve = Base.resolve, lazy = Base.lazy, defaultEnv = Base.defaultEnv;
    rz = resolve;
    lz = lazy;
    lc = Leisure_call;
    runMonad2 = Runtime.runMonad2, newConsFrom = Runtime.newConsFrom, setValue = Runtime.setValue, getValue = Runtime.getValue, makeSyncMonad = Runtime.makeSyncMonad, makeHamt = Runtime.makeHamt, _true = Runtime._true, _false = Runtime._false, _identity = Runtime._identity, _unit = Runtime._unit, jsonConvert = Runtime.jsonConvert, Monad2 = Runtime.Monad2, some = Runtime.some, none = Runtime.none, acons = Runtime.lacons, right = Runtime.right, left = Runtime.left, bind = Runtime.bind;
    evalLeisure = Eval.evalLeisure;
    parseCodeAttributes = Org.parseCodeAttributes;
    currentDataChange = null;
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
    svgMeasure = function(content) {
      return primSvgMeasure(content, baseStrokeWidth);
    };
    svgBetterMeasure = function(content) {
      return primSvgMeasure(content, transformStrokeWidth);
    };
    primSvgMeasure = function(content, transformFunc) {
      return function(f) {
        var bbox, g, pad, svg;
        svg = createNode("<svg xmlns='http://www.w3.org/2000/svg' version='1.1' style='top: -100000'><g>" + content + "</g></svg>");
        document.body.appendChild(svg);
        g = svg.firstChild;
        bbox = g.getBBox();
        pad = getMaxStrokeWidth(g, g, svg, transformFunc);
        document.body.removeChild(svg);
        return rz(f)(lz(bbox.x - Math.ceil(pad / 2)))(lz(bbox.y - Math.ceil(pad / 2)))(lz(bbox.width + pad))(lz(bbox.height + pad));
      };
    };
    baseElements = ['path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon'];
    foldLeft = function(func, val, thing) {
      if (thing instanceof Leisure_cons) {
        return thing.foldl(func, val);
      } else {
        return primFoldLeft(func, val, thing, 0);
      }
    };
    primFoldLeft = function(func, val, array, index) {
      if (index < array.length) {
        return primFoldLeft(func, func(val, array[index]), array, index + 1);
      } else {
        return val;
      }
    };
    getMaxStrokeWidth = function(el, base, svg, transformFunc) {
      var ref1, ref2;
      if (ref1 = base.nodeName, indexOf.call(baseElements, ref1) >= 0) {
        svg.setAttribute('width', (ref2 = getComputedStyle(base).strokeWidth) != null ? ref2 : '0', svg);
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
    define('svgMeasure', (function(content) {
      return svgMeasure(rz(content));
    }), 1);
    define('svgMeasureText', (function(text) {
      return svgMeasureText(rz(text));
    }), 1);
    define('dataMod', setDataType((function(op) {
      var m;
      m = new Monad2(function(env, cont) {
        var data;
        data = {};
        return runMods(env, rz(op), data, cont, true);
      });
      m.op = op;
      m.leisureType = 'dataMod';
      return m;
    }), 'dataMod'));
    define('dataModOperation', function(mod) {
      return rz((rz(mod)).op);
    });
    define('setTheme', function(theme) {
      return new Monad2(function(env, cont) {
        env.opts.setTheme(theme);
        return cont(_unit);
      });
    });
    collabId = 0;
    envData = function(env) {
      return env.data || env.opts.data || Lounge.data;
    };
    dispatchCollaborative = function(name, args) {
      return new Monad2("collaborative-" + name, function(env, cont) {
        return envData(env).doCollaboratively(name, _.map(args, function(el) {
          return L_toJson(el);
        })).then(function(result) {
          return cont(right(jsonConvert(result)));
        })["catch"](function(err) {
          return cont(left(err.stack));
        });
      });
    };
    defaultEnvWithData = function(data) {
      var env;
      env = Object.create(defaultEnv);
      env.data = data;
      return env;
    };
    define('makeCollaborative', function(func) {
      return new Monad2('makeCollaborative', function(env, cont) {
        var data, dispatchFunc, dispatchSrc, funcLen, i, name;
        data = envData(env);
        func = rz(func);
        name = func.leisureName;
        if (func.length > 1) {
          dispatchSrc = "(function(" + (((function() {
            var j, ref1, results;
            results = [];
            for (i = j = 1, ref1 = func.length - 1; 1 <= ref1 ? j <= ref1 : j >= ref1; i = 1 <= ref1 ? ++j : --j) {
              results.push('a' + i);
            }
            return results;
          })()).join(', ')) + "){\n  return isPartial(arguments) ? partialCall(arguments) : dispatchCollaborative(name, arguments);\n})";
          dispatchFunc = eval(dispatchSrc);
          funcLen = dispatchFunc.length;
        } else {
          dispatchFunc = dispatchCollaborative(name, []);
          funcLen = 0;
        }
        define(name, dispatchFunc, funcLen, dispatchSrc);
        data.openRegistration();
        data.registerCollaborativeCode(name, function() {
          var args, context, cvtArgs;
          context = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          cvtArgs = _.map(args, function(el) {
            return jsonConvert(el);
          });
          cvtArgs.unshift(acons('options', context.options, acons('slaveId', context.slaveId, L_nil)));
          return runMonad2(func.apply(null, cvtArgs), defaultEnvWithData(data), function() {});
        });
        data.closeRegistration();
        return cont(_unit);
      });
    });
    define('getData', function(name) {
      return new Monad2('getData', function(env, cont) {
        var d;
        d = envData(env).getData(rz(name));
        if (d) {
          return cont(jsonConvert(d));
        } else {
          return cont(_unit);
        }
      });
    });
    define('getDataOpt', function(name) {
      return new Monad2('getData', function(env, cont) {
        var d;
        d = envData(env).getData(rz(name));
        if (d) {
          return cont(some(jsonConvert(d)));
        } else {
          return cont(none);
        }
      });
    });
    define('getDataUnsafe', function(name) {
      return new Monad2('getData', function(env, cont) {
        var d;
        d = envData(env).getData(rz(name), true);
        if (d) {
          return cont(jsonConvert(d));
        } else {
          return cont(_unit);
        }
      });
    });
    define('getDataUnsafeOpt', function(name) {
      return new Monad2('getData', function(env, cont) {
        var d;
        d = envData(env).getData(rz(name), true);
        if (d) {
          return cont(some(jsonConvert(d)));
        } else {
          return cont(none);
        }
      });
    });
    define('getLocalData', function(name) {
      return new Monad2('getLocalData', function(env, cont) {
        var d;
        d = envData(env).getLocalData(rz(name), true);
        if (d) {
          return cont(jsonConvert(d));
        } else {
          return cont(_unit);
        }
      });
    });
    define('getLocalDataOpt', function(name) {
      return new Monad2('getLocalData', function(env, cont) {
        var d;
        d = envData(env).getLocalData(rz(name), true);
        if (d) {
          return cont(some(jsonConvert(d)));
        } else {
          return cont(none);
        }
      });
    });
    define('setData', function(name, value) {
      var r;
      if (r = doPartial(arguments)) {
        return r;
      } else {
        return new Monad2('setData', function(env, cont) {
          return cont(jsonConvert(envData(env).setData(rz(name), L_toJson(rz(value)))));
        });
      }
    });
    define('setLocalData', function(name, value) {
      var r;
      if (r = doPartial(arguments)) {
        return r;
      } else {
        return new Monad2('setLocalData', function(env, cont) {
          return cont(jsonConvert(envData(env).setLocalData(rz(name), L_toJson(rz(value)))));
        });
      }
    });
    define('appendData', function(headline, name, value) {
      var r;
      if (r = doPartial(arguments)) {
        return r;
      } else {
        return new Monad2('appendData', function(env, cont) {
          envData(env).appendDataToHeadline(rz(headline), rz(name), L_toJson(rz(value)));
          return cont(jsonConvert(rz(value)));
        });
      }
    });
    define('appendDataWithAttrs', function(headline, name, attrs, value) {
      var r;
      if (r = doPartial(arguments)) {
        return r;
      } else {
        return new Monad2('appendDataWithAttrs', function(env, cont) {
          envData(env).appendDataToHeadline(rz(headline), !isNil(rz(name)) && rz(name), L_toJson(rz(value)), parseCodeAttributes(rz(attrs)));
          return cont(rz(value));
        });
      }
    });
    define('removeData', function(name) {
      return new Monad2('removeData', function(env, cont) {
        envData(env).removeData(rz(name));
        return cont(_unit);
      });
    });
    define('getImage', function(name) {
      var data;
      if (isPartial(arguments)) {
        return partialCall(arguments);
      } else {
        data = Lounge.opts.data;
        return new Monad2(function(env, cont) {
          return data.getImage(rz(name), (function(url) {
            return cont(right(url));
          }), function(failure) {
            return cont(left(failure));
          });
        });
      }
    });
    startMonitor = function() {
      return new Monad2(function(env, cont) {
        return cont(monitorChanges(env.opt.data));
      });
    };
    endMonitor = function(mon) {
      return new Monad2(function(env, cont) {
        return cont(mon.stop());
      });
    };
    define('_monitorChanges', function(val) {
      return bind(startMonitor(), lz(function(mon) {
        return bind(val, lz(function(result) {
          return bind(endMonitor(mon), function(ignore) {
            return cons(mon, result);
          });
        }));
      }));
    });
    return evalLeisure("defMacro 'monitorChanges' \\list . ['_monitorChanges' ['do' | list]]");
  });

}).call(this);

//# sourceMappingURL=leisure-support.js.map
