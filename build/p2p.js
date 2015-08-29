// Generated by CoffeeScript 1.9.3
(function() {
  define(['jquery', 'immutable', 'cs!./lib/webrtc.litcoffee', 'lib/cycle', 'cs!./editor.litcoffee', 'cs!./editorSupport.litcoffee', 'sockjs', 'cs!./hamtData.litcoffee', './lib/fingertree', 'cs!./advice.litcoffee'], function(jq, immutable, Peer, cycle, Editor, Support, SockJS, HamtData, Fingertree, Advice) {
    var DataStore, HamtOrgData, Map, MasterConnection, OrgData, PeerConnection, Set, SlaveConnection, blockText, callOriginal, changeAdvice, computeNewStructure, editorToolbar, getDocumentParams, preserveSelection, ref, replacementFor;
    ref = window.Immutable = immutable, Map = ref.Map, Set = ref.Set;
    PeerConnection = Peer.PeerConnection, MasterConnection = Peer.MasterConnection, SlaveConnection = Peer.SlaveConnection;
    DataStore = Editor.DataStore, preserveSelection = Editor.preserveSelection, blockText = Editor.blockText, computeNewStructure = Editor.computeNewStructure;
    OrgData = Support.OrgData, getDocumentParams = Support.getDocumentParams, editorToolbar = Support.editorToolbar;
    HamtOrgData = HamtData.HamtOrgData;
    changeAdvice = Advice.changeAdvice, callOriginal = Advice.callOriginal;
    Peer = (function() {
      function Peer() {
        this.data = new HamtOrgData();
        this.changedBlocks = new Set();
        this.checkPendingData();
        this.pendingReplaces = [];
      }

      Peer.prototype.checkPendingData = function() {
        var ref1;
        if (!((ref1 = this.con) != null ? ref1.hasPendingReplaces() : void 0) && this.changedBlocks.isEmpty()) {
          return this.incomingData = this.data.snapshot();
        }
      };

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

      Peer.prototype.hasPendingReplaces = function() {
        return this.pendingReplaces.length;
      };

      Peer.prototype.connect = function(url, connectedFunc) {
        var handler;
        this.url = url;
        this.connectedFunc = connectedFunc;
        this.con = new SockJS(this.url);
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
        handler = this;
        return changeAdvice(this.editor.options, true, {
          changesFor: {
            p2p: function(parent) {
              return function(first, oldBlocks, newBlocks, verbatim) {
                handler.sendReplace(parent(first, oldBlocks, newBlocks, verbatim));
                return null;
              };
            }
          }
        });
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
          }
        });
      };

      Peer.prototype.send = function(type, msg) {
        msg.type = type;
        return this.con.send(JSON.stringify(msg));
      };

      Peer.prototype.sendReplace = function(arg) {
        var newBlocks, offset, oldBlocks, repl;
        oldBlocks = arg.oldBlocks, newBlocks = arg.newBlocks;
        offset = this.data.offsetForBlock(oldBlocks[0]);
        repl = replacementFor(offset, blockText(oldBlocks), blockText(newBlocks));
        repl.context = this.editor.options.changeContext;
        repl.type = 'replace';
        this.pendingReplaces.push(repl);
        return this.send('replace', repl);
      };

      Peer.prototype.handleMessage = function(msg) {
        if (!(msg.type in this.handler)) {
          console.log("Received bad message " + msg.type, msg);
          return this.close();
        } else {
          return this.handler[msg.type].call(this, msg);
        }
      };

      Peer.prototype.handler = {
        log: function(msg) {
          return console.log(msg.msg);
        },
        connect: function(msg) {
          this.id = msg.id;
          this.connectionId = msg.connectionId;
          if (typeof this.connectedFunc === "function") {
            this.connectedFunc(this);
          }
          return this.connectedFunc = null;
        },
        error: function(msg) {
          console.log("Received error: " + msg.error, msg);
          return this.close();
        },
        echo: function(msg) {
          msg = this.pendingReplaces.shift();
          msg.connectionId = this.connectionId;
          return this.handleMessage(msg);
        },
        replace: function(msg) {
          var blocks, end, offset, range, start, text;
          start = msg.start, end = msg.end, text = msg.text;
          blocks = this.data.blockOverlapsForReplacement(start, end, text).blocks;
          offset = this.data.blockOffsetForDocOffset(start).offset;
          if (msg.context) {
            this.editor.options.mergeChangeContext(msg.context);
          }
          if (msg.connectionId === this.connectionId) {
            range = this.editor.getSelectedDocRange();
            this.replaceContent(blocks, offset, end - start, text);
            range.start = start + text.length;
            range.length = 0;
            return this.editor.selectDocRange(range);
          } else {
            return preserveSelection((function(_this) {
              return function(range) {
                var ref1;
                if (end <= range.start) {
                  range.start += text.length - end + start;
                } else if ((start <= (ref1 = range.start) && ref1 < end)) {
                  range.start = start + text.length;
                }
                return _this.replaceContent(blocks, offset, end - start, text);
              };
            })(this));
          }
        }
      };

      Peer.prototype.replaceContent = function(blocks, start, length, text) {
        var newBlocks, newText, offset, oldBlocks, oldText, pos, prev, ref1;
        oldText = blockText(blocks);
        newText = oldText.substring(0, start) + text + oldText.substring(start + length);
        pos = this.data.docOffsetForBlockOffset(blocks[0]._id, start);
        ref1 = computeNewStructure(this.data, blocks, newText), oldBlocks = ref1.oldBlocks, newBlocks = ref1.newBlocks, offset = ref1.offset, prev = ref1.prev;
        if (oldBlocks.length || newBlocks.length) {
          return this.data.change(this.data.changesFor(prev, oldBlocks.slice(), newBlocks.slice()));
        }
      };

      Peer.prototype.createSession = function(host, connectedFunc) {
        this.host = host;
        this.connectedFunc = connectedFunc;
        this.type = 'Master';
        this.handler = {
          __proto__: Peer.prototype.handler,
          connect: function(msg) {
            this.connectUrl = new URL("slave-" + msg.id, this.url);
            Peer.prototype.handler.connect.call(this, msg);
            return this.send('initDoc', {
              doc: this.data.getText()
            });
          },
          slaveConnect: function(msg) {
            return this.send('slaveApproval', {
              slaveId: msg.slaveId,
              approval: true
            });
          },
          slaveDisconnect: function(msg) {}
        };
        return this.connect("http://" + this.host + "/Leisure/master", this.connectedFunc);
      };

      Peer.prototype.connectToSession = function(url, connected) {
        this.url = url;
        this.type = 'Slave';
        this.handler = {
          __proto__: Peer.prototype.handler,
          connect: function(msg) {
            Peer.prototype.handler.connect.call(this, msg);
            return this.editor.options.load(msg.doc);
          }
        };
        return this.connect(this.url, connected);
      };

      return Peer;

    })();
    replacementFor = function(start, oldText, newText) {
      var end, endOff, i, j, ref1, ref2, ref3, startOff;
      end = start + ((ref1 = oldText.length) != null ? ref1 : 0);
      for (startOff = i = 0, ref2 = Math.min(oldText.length, newText.length); 0 <= ref2 ? i < ref2 : i > ref2; startOff = 0 <= ref2 ? ++i : --i) {
        if (oldText[startOff] !== newText[startOff]) {
          break;
        }
      }
      start += startOff;
      for (endOff = j = 0, ref3 = Math.min(oldText.length - startOff - 1, newText.length - startOff - 1); j <= ref3; endOff = j += 1) {
        if (oldText[oldText.length - endOff - 1] !== newText[newText.length - endOff - 1]) {
          break;
        }
      }
      return {
        start: start,
        end: end - endOff,
        text: (startOff || endOff ? newText.substring(startOff, newText.length - endOff) : '')
      };
    };
    $(document).ready(function() {
      var connected, join;
      if (document.location.search.length > 1 && !connected) {
        connected = true;
        join = getDocumentParams().join;
        if (join) {
          return setTimeout((function() {
            var createSessionButton, u;
            createSessionButton = $(editorToolbar(window.PEER.editor.node)).find('[name=p2pConnector] [name=createSession]');
            createSessionButton.data({
              hasSession: true
            });
            createSessionButton.closest('.contents').removeClass('not-connected');
            createSessionButton.closest('.contents').addClass('connected');
            createSessionButton.button('option', 'label', 'Disconnect');
            console.log("CREATE SESSION:", createSessionButton[0]);
            u = new URL(join);
            console.log("JOIN SESSION: " + u);
            return window.PEER.connectToSession(u.toString());
          }), 1);
        }
      }
    });
    return {
      Peer: Peer
    };
  });

}).call(this);

//# sourceMappingURL=p2p.js.map
