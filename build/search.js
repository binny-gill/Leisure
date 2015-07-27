// Generated by CoffeeScript 1.9.3
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['cs!./editor.litcoffee', 'cs!./editorSupport.litcoffee', 'cs!./ui.litcoffee', 'cs!./export.litcoffee'], function(Editor, EditorSupport, UI, BrowserExports) {
    var LeisureEditCore, OrgEditing, SearchEditor, addController, addSearchDataFilter, addView, chr, configureSearch, editorForToolbar, fancyMode, findEditor, grams, hasView, indexQuery, initializePendingViews, mergeContext, mergeExports, normalize, openSearch, removeController, removeView, renderView, searchForBlocks, searchToken, tokenize, viewKey, withContext;
    findEditor = Editor.findEditor, LeisureEditCore = Editor.LeisureEditCore;
    OrgEditing = EditorSupport.OrgEditing, fancyMode = EditorSupport.fancyMode, editorForToolbar = EditorSupport.editorForToolbar;
    addView = UI.addView, removeView = UI.removeView, renderView = UI.renderView, hasView = UI.hasView, viewKey = UI.viewKey, addController = UI.addController, removeController = UI.removeController, withContext = UI.withContext, mergeContext = UI.mergeContext, initializePendingViews = UI.initializePendingViews;
    mergeExports = BrowserExports.mergeExports;
    searchToken = /[^\'\"]+|\'[^\']*\'|\"[^\"]*\"/g;
    normalize = function(str) {
      return str && str.toLowerCase().replace(/([^a-z0-9]|\n)+/g, '').trim();
    };
    chr = function(c) {
      return c.charCodeAt(0);
    };
    grams = function(str, gr) {
      var c, cc, i, j, k, l, len, m, n, ref, ref1, ref2, ref3, ref4, ref5, ref6, results1, results2;
      if (gr == null) {
        gr = {};
      }
      str = normalize(str);
      if (str) {
        ref4 = (function() {
          results2 = [];
          for (var l = ref2 = chr('a'), ref3 = chr('z'); ref2 <= ref3 ? l <= ref3 : l >= ref3; ref2 <= ref3 ? l++ : l--){ results2.push(l); }
          return results2;
        }).apply(this).concat((function() {
          results1 = [];
          for (var k = ref = chr('0'), ref1 = chr('9'); ref <= ref1 ? k <= ref1 : k >= ref1; ref <= ref1 ? k++ : k--){ results1.push(k); }
          return results1;
        }).apply(this));
        for (j = 0, len = ref4.length; j < len; j++) {
          cc = ref4[j];
          c = String.fromCharCode(cc);
          if (str.indexOf(c) > -1) {
            gr[c] = true;
          }
        }
      }
      if (str && str.length >= 2) {
        for (i = m = 0, ref5 = str.length - 3; 0 <= ref5 ? m < ref5 : m > ref5; i = 0 <= ref5 ? ++m : --m) {
          gr[str.substring(i, i + 2)] = true;
        }
      }
      if (str && str.length >= 3) {
        for (i = n = 0, ref6 = str.length - 2; 0 <= ref6 ? n < ref6 : n > ref6; i = 0 <= ref6 ? ++n : --n) {
          gr[str.substring(i, i + 3)] = true;
        }
      }
      return gr;
    };
    tokenize = function(query) {
      var j, len, ref, ref1, results1, token;
      ref1 = (ref = query.match(searchToken)) != null ? ref : [];
      results1 = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        token = ref1[j];
        results1.push(normalize(token));
      }
      return results1;
    };
    indexQuery = function(query) {
      var j, len, ref, token, tokens, tri;
      tri = {};
      tokens = {};
      ref = tokenize(query);
      for (j = 0, len = ref.length; j < len; j++) {
        token = ref[j];
        if (!tokens[token]) {
          tokens[token] = true;
          grams(token, tri);
        }
      }
      return {
        grams: tri,
        tokens: _.keys(tokens)
      };
    };
    addSearchDataFilter = function(data) {
      return data.addFilter({
        clear: function() {
          return data.ftsIndex = {
            sizes: {},
            gramBlocks: {}
          };
        },
        replaceBlock: function(oldBlock, newBlock) {
          var gram, ref, ref1, ref2, ref3, results1;
          for (gram in grams(oldBlock != null ? oldBlock.text : void 0)) {
            if ((ref = data.ftsIndex.gramBlocks[gram]) != null ? ref[oldBlock._id] : void 0) {
              if ((ref1 = data.ftsIndex.gramBlocks[gram]) != null) {
                delete ref1[oldBlock._id];
              }
              if (!--data.ftsIndex.sizes[gram]) {
                delete data.ftsIndex.gramBlocks[gram];
                delete data.ftsIndex.sizes[gram];
              }
            }
          }
          results1 = [];
          for (gram in grams(newBlock != null ? newBlock.text : void 0)) {
            if (!((ref2 = data.ftsIndex.gramBlocks[gram]) != null ? ref2[newBlock._id] : void 0)) {
              if (!data.ftsIndex.gramBlocks[gram]) {
                data.ftsIndex.gramBlocks[gram] = {};
                data.ftsIndex.sizes[gram] = 0;
              }
              if ((ref3 = data.ftsIndex.gramBlocks[gram]) != null) {
                ref3[newBlock._id] = true;
              }
              results1.push(++data.ftsIndex.sizes[gram]);
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }
      });
    };
    searchForBlocks = function(data, query) {
      var block, blocks, counts, g, gram, gramBlocks, ref, ref1, results, sizes, tokens;
      ref = indexQuery(query), tokens = ref.tokens, g = ref.grams;
      ref1 = data.ftsIndex, gramBlocks = ref1.gramBlocks, sizes = ref1.sizes;
      counts = [];
      for (gram in g) {
        if (!sizes[gram]) {
          return [];
        } else {
          counts.push({
            gram: gram,
            size: sizes[gram]
          });
        }
      }
      if (counts.length) {
        counts.sort(function(a, b) {
          return b.size - a.size;
        });
        results = (function() {
          var results1;
          results1 = [];
          for (block in gramBlocks[counts.pop().gram]) {
            results1.push(block);
          }
          return results1;
        })();
        while (counts.length) {
          blocks = gramBlocks[counts.pop().gram];
          results = _.filter(results, function(x) {
            return blocks[x];
          });
        }
        return _.filter(results, function(id) {
          var text;
          text = normalize(data.getBlock(id).text);
          return _.every(tokens, function(tok) {
            return text.search(tok) >= 0;
          });
        });
      } else {
        return [];
      }
    };
    SearchEditor = (function(superClass) {
      extend(SearchEditor, superClass);

      function SearchEditor(data1) {
        this.data = data1;
        SearchEditor.__super__.constructor.call(this, this.data);
        this.results = {};
      }

      SearchEditor.prototype.initToolbar = function() {};

      SearchEditor.prototype.setResults = function(newResults) {
        var changed;
        if (changed = !_.isEqual(newResults, this.results)) {
          this.results = newResults;
          this.rerenderAll();
        }
        return changed;
      };

      SearchEditor.prototype.renderBlock = function(block) {
        var realBlock;
        realBlock = this.getBlock(block);
        if (this.results[realBlock != null ? realBlock._id : void 0]) {
          return SearchEditor.__super__.renderBlock.call(this, realBlock);
        } else {
          return ['', realBlock != null ? realBlock.next : void 0];
        }
      };

      return SearchEditor;

    })(OrgEditing);
    openSearch = function(event) {
      var editor;
      editor = editorForToolbar(event.originalEvent.srcElement);
      return withContext({
        editor: editor
      }, (function(_this) {
        return function() {
          $(editor.node).append(renderView('leisure-search'));
          return initializePendingViews();
        };
      })(this));
    };
    configureSearch = function(view) {
      var editor, input, opts, output;
      editor = UI.context.editor;
      output = $(view).find('.leisure-searchOutput');
      input = $(view).find('.leisure-searchText');
      opts = new SearchEditor(editor.options.data).setMode(fancyMode);
      new LeisureEditCore(output, opts);
      $(output).parent().addClass('flat');
      opts.setMode(fancyMode);
      opts.rerenderAll();
      return input.on('input', function(e) {
        var hits, results;
        if (hits = searchForBlocks(opts.data, input.val())) {
          results = _.transform(hits, (function(obj, item) {
            return obj[item] = true;
          }), {});
          return opts.setResults(results);
        }
      });
    };
    mergeExports({
      openSearch: openSearch,
      configureSearch: configureSearch,
      searchForBlocks: searchForBlocks
    });
    return {
      normalize: normalize,
      indexQuery: indexQuery,
      tokenize: tokenize,
      addSearchDataFilter: addSearchDataFilter,
      grams: grams,
      searchForBlocks: searchForBlocks,
      openSearch: openSearch
    };
  });

}).call(this);

//# sourceMappingURL=search.js.map