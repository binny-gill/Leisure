// Generated by CoffeeScript 1.10.0
(function() {
  define(['lib/bluebird.min'], function(Bluebird) {
    var Promise, dbName, defer, deleteStore, getLocalStore, hasDatabase, localStore, localTransaction, openStore, promiseForRequest, stores, transaction;
    Promise = Bluebird.Promise;
    stores = {};
    dbName = 'leisureStorage';
    deleteStore = false;
    localStore = null;
    getLocalStore = function(id) {
      if (deleteStore) {
        return (new Promise(function(succeed, fail) {
          var req;
          deleteStore = false;
          delete stores[id];
          req = indexedDB.deleteDatabase(dbName);
          req.onsuccess = succeed;
          return req.onerror = fail;
        })).then(function() {
          return openStore(id);
        });
      } else {
        return openStore(id);
      }
    };
    openStore = function(id, version) {
      return stores[id] || (stores[id] = new Promise(function(succeed, fail) {
        var req;
        req = indexedDB.open(dbName, version != null ? version : 1);
        req.onupgradeneeded = function(e) {
          var db;
          db = req.result;
          if (!db.objectStoreNames.contains(id)) {
            return db.createObjectStore(id, {
              keyPath: '_id'
            });
          }
        };
        req.onsuccess = function() {
          var db;
          db = req.result;
          if (!db.objectStoreNames.contains(id)) {
            return openStore(id, db.version + 1);
          } else {
            return succeed(localStore = req.result);
          }
        };
        return req.onerror = fail;
      }));
    };
    defer = function(cont) {
      return setTimeout(cont, 1);
    };
    localTransaction = function(id, type) {
      var action, p;
      p = getLocalStore(id);
      action = function(db) {
        if (db.objectStoreNames.contains(id)) {
          return db.transaction([id], type || 'readwrite');
        } else {
          return Promise.reject("No object store named " + id);
        }
      };
      if (p.isResolved()) {
        return action(p.value());
      } else {
        return p.then(action);
      }
    };
    promiseForRequest = function(req) {
      return new Promise(function(succeed, fail) {
        req.onsuccess = function(e) {
          return succeed(req.result);
        };
        return req.onerror = function(e) {
          console.log("Database failure:", e);
          return fail(e);
        };
      });
    };
    hasDatabase = function(id) {
      return stores[id];
    };
    transaction = function(id, type) {
      var doAction, obj, p, setTrans, trans;
      trans = null;
      p = localTransaction(id, type);
      obj = {
        transaction: null,
        store: null,
        then: function(func) {
          if (trans) {
            return func(trans);
          } else {
            return p.then(obj);
          }
        },
        put: function(value, key) {
          console.log("Putting value into store " + id, value);
          return doAction((function(_this) {
            return function() {
              return _this.store.put(value, key);
            };
          })(this));
        },
        get: function(key) {
          return doAction((function(_this) {
            return function() {
              return _this.store.get(key);
            };
          })(this));
        },
        "delete": function(key) {
          return doAction((function(_this) {
            return function() {
              return _this.store["delete"](key);
            };
          })(this));
        },
        clear: function() {
          return doAction((function(_this) {
            return function() {
              return _this.store.clear();
            };
          })(this));
        },
        getAll: function(index) {
          var results;
          results = [];
          return doAction((function(_this) {
            return function() {
              return new Promise(function(succeed, fail) {
                var cursorReq;
                cursorReq = (index ? _this.store.index(index) : _this.store).openCursor();
                cursorReq.onsuccess = function(e) {
                  var cursor;
                  if (cursor = e.target.result) {
                    results.push(cursor.value);
                    return cursor["continue"]();
                  } else {
                    return succeed(results);
                  }
                };
                return cursorReq.onerror = fail;
              });
            };
          })(this));
        }
      };
      setTrans = function(t) {
        trans = obj.transaction = t;
        return obj.store = t.objectStore(id);
      };
      if (p instanceof Promise) {
        p = p.then(function(t) {
          return setTrans(t);
        });
      } else {
        setTrans(p);
      }
      doAction = function(action) {
        if (trans) {
          return promiseForRequest(action());
        } else {
          return p.then(function() {
            return promiseForRequest(action());
          });
        }
      };
      return obj;
    };
    return {
      hasDatabase: hasDatabase,
      transaction: transaction
    };
  });

}).call(this);

//# sourceMappingURL=db.js.map
