// Generated by CoffeeScript 1.9.3
(function() {
  var init;

  init = function(jqui, EditorSupport, Modes, Diag, P2P, Tests, Webrtc, Defaults, UI, BrowserExports, Search, Emacs) {
    var OrgData, Peer, addEmacsDataFilter, addSearchDataFilter, configurePeerButttons, createEditorDisplay, createStructureDisplay, fancyEditDiv, findPeer, getDocumentParams, initializePendingViews, installSelectionMenu, mergeExports, peer, plainEditDiv, renderView, runTests, useP2P, withContext;
    OrgData = EditorSupport.OrgData, installSelectionMenu = EditorSupport.installSelectionMenu, getDocumentParams = EditorSupport.getDocumentParams;
    plainEditDiv = Modes.plainEditDiv, fancyEditDiv = Modes.fancyEditDiv;
    createStructureDisplay = Diag.createStructureDisplay, createEditorDisplay = Diag.createEditorDisplay;
    Peer = P2P.Peer;
    findPeer = Webrtc.findPeer;
    runTests = Tests.runTests;
    renderView = UI.renderView, initializePendingViews = UI.initializePendingViews, withContext = UI.withContext;
    mergeExports = BrowserExports.mergeExports;
    addSearchDataFilter = Search.addSearchDataFilter;
    addEmacsDataFilter = Emacs.addEmacsDataFilter;
    useP2P = false;
    peer = null;
    Leisure.configureP2P = function() {};
    configurePeerButttons = function() {
      return Leisure.configureP2P = function(arg) {
        var connectToSessionButton, connections, createSessionButton, hostField, sessionField;
        hostField = arg.hostField, sessionField = arg.sessionField, createSessionButton = arg.createSessionButton, connectToSessionButton = arg.connectToSessionButton, connections = arg.connections;
        hostField.val(document.location.host || "localhost:8080");
        createSessionButton.click(function() {
          peer.createSession(hostField.val());
          return console.log("create session");
        });
        return connectToSessionButton.click(function() {
          return console.log("connect to session");
        });
      };
    };
    return $(document).ready(function() {
      var data, load, ref, theme;
      runTests();
      installSelectionMenu();
      if (useP2P) {
        configurePeerButttons();
        window.PEER = peer = new Peer;
        window.DATA = data = peer.data;
      } else {
        window.DATA = data = new OrgData();
      }
      addSearchDataFilter(data);
      data.processDefaults(Defaults);
      createStructureDisplay(data);
      window.ED = fancyEditDiv($("[maindoc]"), data);
      createEditorDisplay(ED);
      if (document.location.search) {
        ref = getDocumentParams(), load = ref.load, theme = ref.theme;
        if (load) {
          $.get(load, function(data) {
            return ED.options.load(data);
          });
          ED.options.loadName = new URL(load, document.location).toString();
        }
        if (theme) {
          ED.options.setTheme(theme);
        }
      } else {
        ED.options.load("burp\n* top\nbubba\n\n[[leisure:bubba]][[leisure:bubba]]\n#+NAME: bubba\n#+BEGIN_SRC yaml\ntype: rotator\ndegrees: 45\n#+END_SRC\n\n#+BEGIN_HTML\n<b>hello</b>\n#+END_HTML\n\n#+BEGIN_SRC html :defview rotator\n<div style='padding: 25px; display: inline-block'>\n  <div style='transform: rotate({{degrees}}deg);height: 100px;width: 100px;background: green'></div>\n</div>\n#+END_SRC\n\n#+BEGIN_SRC cs :control rotator\n@initializeView = (view)-> #console.log \"initialize\", view\n#+END_SRC\n\n#+BEGIN_SRC html :defview leisure-headlineX\n<span id='{{id}}' data-block='headline'><span class='hidden'>{{stars}}</span><span class='maintext'>{{maintext}}</span>{{EOL}}{{nop\n}}</span>{{#each children}}{{{render this}}}{{/each}}</span>\n#+END_SRC\n\n#+BEGIN_SRC css\n[data-block='headline'] .maintext {\n  font-weight: bold;\n  color: blue;\n}\n.custom-headline {\n  font-weight: bold;\n  color: green;\n}\n[data-block='headline'] {\n  color: orangeX;\n}\n#+END_SRC\n* Test properties > splunge\n#+BEGIN_SRC lisp :results dynamic\n(+ 3 4)\n#+END_SRC\n#+RESULTS:\n: 7\n ** sub 1\n*/duh/*\n:properties:\n:hidden: true\n:a: 1\n:end:\n#+BEGIN_SRC js :results dynamic\n3 + 4\n#+END_SRC\n#+RESULTS:\n: 7\n\n#+BEGIN_SRC cs :results dynamic\n'<b>duh</b>'\nhtml '<b>duh</b>'\n37/3333\nhtml '<img src=\"https://imgs.xkcd.com/comics/lisp_cycles.png\">'\n#+END_SRC\n#+RESULTS:\n: &lt;b&gt;duh&lt;/b&gt;\n: <b>duh</b>\n: 0.0111011101110111\n: <img src=\"https://imgs.xkcd.com/comics/lisp_cycles.png\">\n\nimage link\n[[https://imgs.xkcd.com/comics/lisp_cycles.png]]\n\npeep\n:properties:\n:b: 2\n:end:\n** sub 2\nasdf" + '\n');
      }
      return $('#globalLoad').remove();
    });
  };

  require(['jquery'], function() {
    return require(['jqueryui', 'cs!./editorSupport.litcoffee', 'cs!./modes', 'cs!./diag.litcoffee', 'cs!./p2p.litcoffee', 'cs!./tests.litcoffee', 'cs!./lib/webrtc.litcoffee', 'text!../src/defaults.lorg', 'cs!./ui.litcoffee', 'cs!./export.litcoffee', 'cs!./search.litcoffee', 'cs!./emacs.litcoffee'], init);
  });

}).call(this);

//# sourceMappingURL=local.js.map
