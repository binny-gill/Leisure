// Generated by CoffeeScript 1.10.0
(function() {
  var slice = [].slice;

  define(['jquery', 'immutable', './editor', './editorSupport', 'sockjs', './advice', './common', 'lib/bluebird.min', 'lib/ot/ot', './replacements', './export'], function(jq, immutable, Editor, Support, SockJS, Advice, Common, Bluebird, OT, Rep, Exports) {
    var DataStore, EditorClient, Map, OrgData, Peer, Promise, Replacements, Selection, Set, TextOperation, afterMethod, ajaxGet, basicDataFilter, beforeMethod, blockText, callOriginal, changeAdvice, computeNewStructure, configureOpts, diag, editorToolbar, fileTypes, getDocumentParams, isDelete, isInsert, isRetain, makeImageBlob, mergeExports, noTrim, preserveSelection, randomUserName, ref, replacementFor, replacements, typeForFile, validateBatch;
    mergeExports = Exports.mergeExports;
    ref = window.Immutable = immutable, Map = ref.Map, Set = ref.Set;
    DataStore = Editor.DataStore, preserveSelection = Editor.preserveSelection, blockText = Editor.blockText, computeNewStructure = Editor.computeNewStructure, validateBatch = Editor.validateBatch;
    OrgData = Support.OrgData, getDocumentParams = Support.getDocumentParams, editorToolbar = Support.editorToolbar, basicDataFilter = Support.basicDataFilter, replacementFor = Support.replacementFor, ajaxGet = Support.ajaxGet, makeImageBlob = Support.makeImageBlob;
    changeAdvice = Advice.changeAdvice, afterMethod = Advice.afterMethod, beforeMethod = Advice.beforeMethod, callOriginal = Advice.callOriginal;
    noTrim = Common.noTrim;
    Promise = Bluebird.Promise;
    TextOperation = OT.TextOperation, Selection = OT.Selection, EditorClient = OT.EditorClient;
    isRetain = TextOperation.isRetain, isInsert = TextOperation.isInsert, isDelete = TextOperation.isDelete;
    Replacements = Rep.Replacements, replacements = Rep.replacements;
    fileTypes = {
      png: 'image/png',
      gif: 'image/gif',
      bmp: 'image/bmp',
      xpm: 'image/xpm',
      svg: 'image/svg+xml'
    };
    diag = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return console.log.apply(console, args);
    };
    Peer = (function() {
      function Peer() {
        this.data = new OrgData();
        this.namePromise = randomUserName((function(_this) {
          return function(name1) {
            _this.name = name1;
          };
        })(this));
        this.guardedChangeId = 0;
        this.guardPromises = {};
      }

      Peer.prototype.setEditor = function(editor) {
        this.editor = editor;
      };

      Peer.prototype.disconnect = function() {
        var ref1;
        if ((ref1 = this.con) != null) {
          ref1.close();
        }
        return this.con = null;
      };

      Peer.prototype.connect = function(url, connectedFunc1) {
        var opened, peer;
        this.url = url;
        this.connectedFunc = connectedFunc1;
        console.log("CONNECTED");
        this.con = new SockJS(this.url);
        opened = false;
        this.namePromise["finally"]((function(_this) {
          return function() {
            delete _this.namePromise;
            return new Promise(function(resolve, reject) {
              _this.con.onopen = function() {
                opened = true;
                _this.con.onerror = function() {
                  return _this.closed();
                };
                return resolve();
              };
              return _this.con.onerror = function() {
                if (!openend) {
                  return reject();
                }
              };
            });
          };
        })(this));
        this.con.onmessage = (function(_this) {
          return function(msg) {
            return _this.handleMessage(JSON.parse(msg.data));
          };
        })(this);
        this.con.onclose = (function(_this) {
          return function() {
            return _this.closed();
          };
        })(this);
        peer = this;
        this.editor.options.data.peer = this;
        configureOpts(this.editor.options);
        return this.editor.on('selection', (function(_this) {
          return function() {
            return _this.getSelection();
          };
        })(this));
      };

      Peer.prototype.opFor = function(arg, length) {
        var end, op, start, text;
        start = arg.start, end = arg.end, text = arg.text;
        op = new TextOperation();
        if (start > 0) {
          op = op.retain(start);
        }
        if (end > start) {
          op = op["delete"](end - start);
        }
        if (text.length) {
          op = op.insert(text);
        }
        if (length > end) {
          op = op.retain(length - end);
        }
        return op;
      };

      Peer.prototype.opsFor = function(repls, totalLength) {
        if (repls instanceof Replacements) {
          return this.baseOpsFor(totalLength, function(f) {
            var length, offset, ref1, results, t, text;
            t = repls.replacements;
            results = [];
            while (!t.isEmpty()) {
              ref1 = t.peekFirst(), offset = ref1.offset, length = ref1.length, text = ref1.text;
              t = t.removeFirst();
              results.push(f(offset, length, text));
            }
            return results;
          });
        } else if (_.isArray(repls)) {
          return this.baseOpsFor(totalLength, function(f) {
            var j, last, repl, results;
            last = 0;
            results = [];
            for (j = repls.length - 1; j >= 0; j += -1) {
              repl = repls[j];
              f(repl.start - last, repl.end - repl.start, repl.text);
              results.push(last = repl.end);
            }
            return results;
          });
        }
      };

      Peer.prototype.baseOpsFor = function(totalLength, iterate) {
        var cursor, op;
        op = new TextOperation();
        cursor = 0;
        iterate(function(offset, length, text) {
          if (offset > 0) {
            op = op.retain(offset);
          }
          if (length > 0) {
            op = op["delete"](length);
          }
          if (text.length) {
            op = op.insert(text);
          }
          return cursor += offset + length;
        });
        if (totalLength > cursor) {
          op = op.retain(totalLength - cursor);
        }
        return op;
      };

      Peer.prototype.inverseOpFor = function(arg, len) {
        var end, start, text;
        start = arg.start, end = arg.end, text = arg.text;
        return this.opFor({
          start: start,
          end: start + text.length,
          text: this.data.getDocSubstring(start, end)
        }, len);
      };

      Peer.prototype.type = 'Unknown Handler';

      Peer.prototype.close = function() {
        console.log("CLOSING: " + this.type);
        return this.con.close();
      };

      Peer.prototype.closed = function() {
        return changeAdvice(this.editor.options, false, {
          changesFor: {
            p2p: true
          },
          batchReplace: {
            p2p: true
          }
        });
      };

      Peer.prototype.send = function(type, msg) {
        msg.type = type;
        return this.con.send(JSON.stringify(msg));
      };

      Peer.prototype.handleMessage = function(msg) {
        if (!(msg.type in this.handler)) {
          console.log("Received bad message " + msg.type, msg);
          return this.close();
        } else {
          return this.handler[msg.type].call(this, msg);
        }
      };

      Peer.prototype.finishConnected = function(arg) {
        var peers, revision;
        this.id = arg.id, peers = arg.peers, revision = arg.revision;
        this.editorClient = new EditorClient(revision, peers, this, this);
        this.newConnectionFunc(_.size(this.editorClient.clients));
        if (typeof this.connectedFunc === "function") {
          this.connectedFunc(this);
        }
        return this.connectedFunc = null;
      };

      Peer.prototype.handler = {
        log: function(msg) {
          return console.log(msg.msg);
        },
        connection: function(arg) {
          var peerId, peerName;
          peerId = arg.peerId, peerName = arg.peerName;
          this.serverCallbacks.set_name(peerId, peerName);
          return this.newConnectionFunc(_.size(this.editorClient.clients));
        },
        disconnection: function(arg) {
          var peerId;
          peerId = arg.peerId;
          this.serverCallbacks.client_left(peerId);
          return this.newConnectionFunc(_.size(this.editorClient.clients));
        },
        error: function(msg) {
          console.log("Received error: " + msg.error, msg);
          return this.close();
        },
        ack: function() {
          return this.serverCallbacks.ack();
        },
        ackGuard: function(arg) {
          var guardId, operation;
          guardId = arg.guardId, operation = arg.operation;
          this.guardPromises[guardId][0](operation);
          return delete this.guardPromises[guardId];
        },
        rejectGuard: function(ack) {
          this.guardPromises[ack.guardId][1](ack);
          return delete this.guardPromises[ack.guardId];
        },
        operation: function(arg) {
          var meta, operation, peerId;
          peerId = arg.peerId, operation = arg.operation, meta = arg.meta;
          this.fromServer = true;
          this.serverCallbacks.operation(operation);
          this.fromServer = false;
          return this.serverCallbacks.selection(peerId, meta);
        },
        selection: function(arg) {
          var peerId, selection;
          peerId = arg.peerId, selection = arg.selection;
          return this.serverCallbacks.selection(selection);
        },
        setName: function(arg) {
          var name, peerId;
          peerId = arg.peerId, name = arg.name;
          this.serverCallbacks.set_name(peerId, name);
          return this.newConnectionFunc(_.size(this.editorClient.clients));
        }
      };

      Peer.prototype.createSession = function(host, connectedFunc, newConnectionFunc) {
        var ref1;
        this.host = host;
        this.newConnectionFunc = newConnectionFunc;
        this.type = 'Master';
        this.newConnectionFunc = (ref1 = this.newConnectionFunc) != null ? ref1 : function() {};
        this.handler = {
          __proto__: Peer.prototype.handler,
          connected: function(msg) {
            this.guid = msg.guid;
            this.connectUrl = new URL("join-" + this.guid, this.url);
            this.editorClient = new EditorClient(0, {}, this, this);
            return this.finishConnected(msg);
          },
          slaveConnect: function(msg) {
            return this.send('slaveApproval', {
              slaveId: msg.slaveId,
              approval: true
            });
          },
          slaveDisconnect: function(msg) {},
          requestFile: function(arg) {
            var filename, id, slaveId;
            slaveId = arg.slaveId, filename = arg.filename, id = arg.id;
            return this.editor.options.data.getFile(filename, ((function(_this) {
              return function(content) {
                return _this.send('fileContent', {
                  slaveId: slaveId,
                  id: id,
                  content: btoa(content)
                });
              };
            })(this)), (function(failure) {
              return this.send('fileError', {
                slaveId: slaveId,
                id: id,
                failure: failure
              });
            }));
          }
        };
        this.connect("http://" + this.host + "/Leisure/create", (function(_this) {
          return function() {
            _this.send('initDoc', {
              doc: _this.data.getText(),
              name: _this.name
            });
            _this.docSnap = _this.data.getText();
            return connectedFunc();
          };
        })(this));
        return this.docSnap = this.data.getText();
      };

      Peer.prototype.connectToSession = function(url, connected, newConnectionFunc) {
        var fileRequestCount, getFile, peer, pendingRequests, ref1;
        this.url = url;
        this.newConnectionFunc = newConnectionFunc;
        this.type = 'Slave';
        this.newConnectionFunc = (ref1 = this.newConnectionFunc) != null ? ref1 : function() {};
        this.localResources = {};
        this.imageSizes = {};
        this.imgCount = 0;
        fileRequestCount = 0;
        pendingRequests = new Map();
        peer = this;
        getFile = function(filename, cont, fail) {
          var id;
          id = "request-" + (fileRequestCount++);
          pendingRequests = pendingRequests.set(id, [cont, fail]);
          return peer.send('requestFile', {
            id: id,
            filename: filename
          });
        };
        changeAdvice(this.editor.options.data, true, {
          getFile: {
            p2p: function(parent) {
              return getFile;
            }
          }
        });
        Leisure.localActivateScripts(this.editor.options);
        changeAdvice(this.editor.options, true, {
          imageError: {
            p2p: function(parent) {
              return function(img, e) {
                var name, ref2, ref3, src;
                src = img.getAttribute('src');
                if (!src.match('^.*:.*')) {
                  name = (ref2 = src.match(/([^#?]*)([#?].*)?$/)) != null ? ref2[1] : void 0;
                  src = "" + src;
                } else {
                  name = (ref3 = src.match(/^file:([^#?]*)([#?].*)?$/)) != null ? ref3[1] : void 0;
                }
                if (name) {
                  if (!img.id) {
                    img.id = "p2p-image-" + (peer.imgCount++);
                  }
                  img.src = '';
                  return peer.fetchImage(img.id, src);
                }
              };
            }
          }
        });
        this.fetchImage = function(imgId, src) {
          var data, img;
          if (img = $("#" + imgId)[0]) {
            if (data = this.localResources[src]) {
              if (data instanceof Promise) {
                return data.then((function(_this) {
                  return function(data) {
                    return _this.replaceImage(img, src, data);
                  };
                })(this));
              } else {
                return preserveSelection((function(_this) {
                  return function(range) {
                    return _this.replaceImage(img, src, data);
                  };
                })(this));
              }
            } else {
              return this.localResources[src] = new Promise((function(_this) {
                return function(resolve, reject) {
                  return getFile(src, (function(file) {
                    data = _this.localResources[src] = makeImageBlob(src, file);
                    preserveSelection(function(range) {
                      return _this.replaceImage(img, src, data);
                    });
                    return resolve(data);
                  }), reject);
                };
              })(this));
            }
          }
        };
        this.replaceImage = function(img, src, data) {
          return setTimeout(((function(_this) {
            return function() {
              img.src = data;
              return img.onload = function() {
                img.removeAttribute('style');
                return _this.imageSizes[src] = " style='height: " + img.height + "px; width: " + img.width + "px'";
              };
            };
          })(this)), 0);
        };
        this.handler = {
          __proto__: Peer.prototype.handler,
          connected: function(msg) {
            this.finishConnected(msg);
            this.editor.options.load('shared', msg.doc);
            return this.docSnap = msg.doc;
          },
          fileContent: function(arg) {
            var cont, content, id;
            id = arg.id, content = arg.content;
            cont = pendingRequests.get(id)[0];
            pendingRequests = pendingRequests.remove(id);
            return cont(atob(content));
          },
          fileError: function(arg) {
            var cont, fail, failure, id, ref2;
            id = arg.id, failure = arg.failure;
            ref2 = pendingRequests.get(id), cont = ref2[0], fail = ref2[1];
            pendingRequests = pendingRequests.remove(id);
            return fail(failure);
          }
        };
        return this.connect(this.url, (function(_this) {
          return function() {
            _this.send('intro', {
              name: _this.name
            });
            return typeof connected === "function" ? connected() : void 0;
          };
        })(this));
      };

      Peer.prototype.replsForTextOp = function(textOp) {
        var cursor, j, len1, op, popLastEmpty, ref1, repls;
        repls = [];
        popLastEmpty = function() {
          var r;
          if ((r = _.last(repls)) && r.start === r.end && r.text.length === 0) {
            return repls.pop();
          }
        };
        cursor = 0;
        ref1 = textOp.ops;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          op = ref1[j];
          if (isRetain(op)) {
            cursor += op;
            popLastEmpty();
            repls.push({
              start: cursor,
              end: cursor,
              text: ''
            });
          } else if (isDelete(op)) {
            cursor -= op;
            _.last(repls).end = cursor;
          } else {
            _.last(repls).text += op;
          }
        }
        popLastEmpty();
        return repls;
      };

      Peer.prototype.replaceText = function(start, end, text) {
        return this.data.replaceText({
          start: start,
          end: end,
          text: text,
          source: 'peer'
        });
      };

      Peer.prototype.registerCallbacks = function(cb) {
        if (cb.client_left) {
          return this.serverCallbacks = cb;
        } else {
          return this.editorCallbacks = cb;
        }
      };

      Peer.prototype.registerUndo = function(undoFunc) {
        this.undoFunc = undoFunc;
      };

      Peer.prototype.registerRedo = function(redoFunc) {
        this.redoFunc = redoFunc;
      };

      Peer.prototype.getValue = function() {
        return this.data.getText();
      };

      Peer.prototype.applyOperation = function(op) {
        return preserveSelection((function(_this) {
          return function(sel) {
            var j, ref1, repl;
            if (sel.type !== 'None') {
              _this.data.addMark('selStart', sel.start);
              _this.data.addMark('selEnd', sel.start + sel.length);
            }
            ref1 = _this.replsForTextOp(op);
            for (j = ref1.length - 1; j >= 0; j += -1) {
              repl = ref1[j];
              _this.replaceText(repl.start, repl.end, repl.text);
            }
            if (sel.type !== 'None') {
              sel.start = _this.data.getMarkLocation('selStart');
              sel.length = _this.data.getMarkLocation('selEnd') - sel.start;
              _this.data.removeMark('selStart');
              return _this.data.removeMark('selEnd');
            }
          };
        })(this));
      };

      Peer.prototype.getSelection = function() {
        var newSel, sel;
        sel = this.editor.getSelectedDocRange();
        newSel = sel.type === 'Caret' ? Selection.createCursor(sel.start) : sel.type === 'Range' ? new Selection([new Selection.Range(sel.start, sel.start + sel.length)]) : new Selection();
        newSel.scrollTop = sel.scrollTop;
        newSel.scrollLeft = sel.scrollLeft;
        return newSel;
      };

      Peer.prototype.setSelection = function(sel) {
        if (sel.ranges.length) {
          return this.editor.selectDocRange({
            start: sel.ranges[0].start,
            length: sel.ranges[0].end - sel.ranges[0].start,
            scrollTop: sel.scrollTop,
            scrollLeft: sel.scrollLeft
          });
        }
      };

      Peer.prototype.setOtherSelection = function(sel, color, id) {
        return console.log("OTHER SELECTION: " + (JSON.stringify(sel)));
      };

      Peer.prototype.sendSelection = function(sel) {
        return this.send('selection', {
          selection: sel
        });
      };

      Peer.prototype.sendOperation = function(revision, operation, selection) {
        return this.send('operation', {
          revision: revision,
          operation: operation,
          selection: selection
        });
      };

      Peer.prototype.sendGuardedOperation = function(revision, operation, guards) {
        var guardId;
        guardId = "guard-" + (this.guardedChangeId++);
        this.send('guardedOperation', {
          revision: revision,
          operation: operation,
          guards: guards,
          guardId: guardId,
          selection: this.editorClient.selection
        });
        return new Promise((function(_this) {
          return function(success, failure) {
            return _this.guardPromises[guardId] = [success, failure];
          };
        })(this));
      };

      return Peer;

    })();
    typeForFile = function(name) {
      var ext, ignore, ref1;
      ref1 = name.match(/\.([^#.]*)(#.*)?$/), ignore = ref1[0], ext = ref1[1];
      return fileTypes[ext];
    };
    configureOpts = function(opts) {
      var data, peer;
      data = opts.data;
      if (!data.peer) {
        return;
      }
      peer = data.peer;
      changeAdvice(data, true, {
        guardedReplaceText: {
          p2p: function(parent) {
            return function(start, end, text, gStart, gEnd) {
              var reps;
              reps = Replacements.fromArray([start, end, text]);
              return peer.sendGuardedOperation(peer.editorClient.revision, peer.opsFor(reps, this.getLength()), [gStart, gEnd]);
            };
          }
        },
        replaceText: {
          p2p: function(parent) {
            return function(repl) {
              var end, newLen, oldLen, start, text;
              if (repl.source !== 'peer') {
                oldLen = this.getLength();
                start = repl.start, end = repl.end, text = repl.text;
                newLen = oldLen + text.length - end + start;
                peer.editorCallbacks.change(peer.opFor(repl, oldLen), peer.inverseOpFor(repl, newLen));
              }
              return parent(repl);
            };
          }
        }
      });
      return changeAdvice(opts, true, {
        batchReplace: {
          p2p: function(parent) {
            return function(replacementFunc, cont, error) {
              var guards, ops, r, repls;
              repls = validateBatch(replacementFunc());
              if (repls.length) {
                ops = peer.opsFor(repls, this.getLength());
                guards = _.flatten((function() {
                  var j, len1, results;
                  results = [];
                  for (j = 0, len1 = repls.length; j < len1; j++) {
                    r = repls[j];
                    if (r.gStart != null) {
                      results.push([r.gStart, r.gEnd]);
                    }
                  }
                  return results;
                })());
                return peer.sendGuardedOperation(peer.editorClient.revision, ops, guards).then(cont, error)["catch"](error);
              } else {
                return cont();
              }
            };
          }
        }
      });
    };
    window.randomUserName = randomUserName = function(done) {
      var i;
      return Promise.all((function() {
        var j, results;
        results = [];
        for (i = j = 0; j < 2; i = ++j) {
          results.push(ajaxGet('http://randomword.setgetgo.com/get.php'));
        }
        return results;
      })()).then(function(names) {
        return done(names.join(' '));
      });
    };
    mergeExports({
      configurePeerOpts: configureOpts
    });
    return {
      Peer: Peer
    };
  });

}).call(this);

//# sourceMappingURL=leisure-client-adapter.js.map
