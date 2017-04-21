// Generated by CoffeeScript 1.12.4
(function() {
  var slice = [].slice;

  define([], function() {
    var Advice, advise, afterMethod, beforeMethod, callOriginal, changeAdvice, unadvise;
    (function() {
      return changeAdvice(object, true, {
        setName: {
          monitorName: afterMethod(function(newName) {
            return console.log("Set name " + newName);
          })
        },
        setOwner: {
          diag: function(parent) {
            return function(newOwner) {
              var err;
              try {
                return parent(newOwner);
              } catch (error) {
                err = error;
                dispayError(err);
                throw err;
              }
            };
          }
        }
      });
    });
    (function() {
      return 
        function monitorName(newName) {
          console.log("Set name " + newName);
        }
        function diagSetOwner(parent) {
          return function (newOwner) {
            try {
              return parent(newOwner);
            } catch (err) {
              dispayError(err);
              throw err;
            }
          };
        }

        changeAdvice(object, true, {
          setName: {monitorName: afterMethod(monitorName)},
          setOwner: {diag: diagSetOwner}
        });
      ;
    });
    changeAdvice = function(object, flag, advice) {
      if (flag) {
        return advise(object, advice);
      } else {
        return unadvise(object, advice);
      }
    };
    beforeMethod = function(def) {
      return function(parent) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          def.apply(this, args);
          return parent.apply(this, args);
        };
      };
    };
    afterMethod = function(def) {
      return function(parent) {
        return function() {
          var args, r;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          r = parent.apply(this, args);
          def.apply(this, args);
          return r;
        };
      };
    };
    Advice = (function() {
      function Advice(target, disabled) {
        this.target = target;
        this.originals = {};
        this.adviceOrder = {};
        this.advice = {};
        if (!disabled) {
          this.enable();
        }
      }

      Advice.prototype.enable = function(method) {
        var i, len, ref;
        if (!this.enabled) {
          if (method) {
            this.installAdviceHandler(method);
          } else {
            if (!this.target.ADVICE) {
              this.target.ADVICE = this;
            } else if (this.target.ADVICE !== this) {
              throw new Error("Attempt to install advice on advised object");
            }
            ref = this.advice;
            for (i = 0, len = ref.length; i < len; i++) {
              method = ref[i];
              this.installAdviceHandler(method);
            }
          }
          this.enabled = true;
          return this;
        }
      };

      Advice.prototype.disable = function(method) {
        var i, len, ref;
        if (this.enabled) {
          if (method) {
            this.target[method] = this.originals[method];
            delete this.originals[method];
            if (_.isEmpty(this.originals)) {
              this.disable();
            }
          } else {
            ref = this.advice;
            for (i = 0, len = ref.length; i < len; i++) {
              method = ref[i];
              this.target[method] = this.originals[method];
            }
            this.originals = {};
            delete this.target.ADVICE;
            this.enabled = false;
          }
          return this;
        }
      };

      Advice.prototype.advise = function(method, name, def) {
        var key;
        key = method + "-" + name;
        this.advice[key] = def;
        if (!this.adviceOrder[method]) {
          this.adviceOrder[method] = [];
        }
        this.adviceOrder[method].push(key);
        if (this.enabled) {
          this.installAdviceHandler(method);
        }
        return this;
      };

      Advice.prototype.unadvise = function(method, name) {
        var i, key, len, ref, ref1, ref2;
        if (!name) {
          ref1 = (ref = this.adviceOrder[method]) != null ? ref : [];
          for (i = 0, len = ref1.length; i < len; i++) {
            name = ref1[i];
            this.removeAdvice(method, name);
          }
        } else {
          key = method + "-" + name;
          if (((ref2 = this.adviceOrder[method]) != null ? ref2.length : void 0) === 1) {
            this.disable(method);
            delete this.adviceOrder[method];
          } else {
            _.remove(this.adviceOrder, function(x) {
              return x === key;
            });
          }
          delete this.advice[key];
        }
        return this;
      };

      Advice.prototype.installAdviceHandler = function(method) {
        if (!this.originals[method]) {
          this.originals[method] = this.target[method];
          return this.target[method] = (function(_this) {
            return function() {
              var args;
              args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
              return _this.callAdvice(_this.adviceOrder[method].length - 1, _this.adviceOrder[method], method, args);
            };
          })(this);
        }
      };

      Advice.prototype.callAdvice = function(index, order, method, args) {
        var func;
        func = index < 0 ? this.originals[method] : this.advice[order[index]]((function(_this) {
          return function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return _this.callAdvice(index - 1, order, method, args);
          };
        })(this));
        return func.apply(this.target, args);
      };

      return Advice;

    })();
    advise = function(object, method, name, def) {
      var advice, meth, ref, results;
      if (typeof method === 'object') {
        results = [];
        for (meth in method) {
          advice = method[meth];
          results.push((function() {
            var results1;
            results1 = [];
            for (name in advice) {
              def = advice[name];
              results1.push(advise(object, meth, name, def));
            }
            return results1;
          })());
        }
        return results;
      } else {
        return ((ref = object.ADVICE) != null ? ref : new Advice(object)).advise(method, name, def);
      }
    };
    unadvise = function(object, method, name) {
      var advice, def, meth, ref, results;
      if (typeof method === 'object') {
        results = [];
        for (meth in method) {
          advice = method[meth];
          results.push((function() {
            var results1;
            results1 = [];
            for (name in advice) {
              def = advice[name];
              results1.push(unadvise(object, meth, name));
            }
            return results1;
          })());
        }
        return results;
      } else {
        return (ref = object.ADVICE) != null ? ref.unadvise(method, name) : void 0;
      }
    };
    callOriginal = function() {
      var args, method, object, ref, ref1, ref2;
      object = arguments[0], method = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      return ((ref = (ref1 = object.ADVICE) != null ? (ref2 = ref1.originals) != null ? ref2[method] : void 0 : void 0) != null ? ref : object[method]).apply(object, args);
    };
    return {
      changeAdvice: changeAdvice,
      beforeMethod: beforeMethod,
      afterMethod: afterMethod,
      advise: advise,
      unadvise: unadvise,
      callOriginal: callOriginal
    };
  });

}).call(this);

//# sourceMappingURL=advice.js.map
