// Generated by CoffeeScript 1.10.0
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['./org', './docOrg', './utilities', './db', './editorSupport'], function(Org, DocOrg, Utilites, EditorSupport) {
    var LocalDoc, clearIndices, getDocument, initStorage, parseOrgDoc, storeDocument, storeNameFor;
    parseOrgDoc = EditorSupport.parseOrgDoc;
    clearIndices = true;
    initStorage = function() {};
    storeNameFor = function(docName) {
      return "@local " + docName;
    };
    getDocument = function(docName) {
      var blocks, t;
      t = transaction(storeNameFor(docName), 'readonly');
      blocks = null;
      return t.getAll('ids').then(function(rawBlocks) {
        blocks = _.keyBy(rawBlocks, '_id');
        return t.get('first').then(function(first) {
          return {
            first: first,
            blocks: blocks
          };
        });
      });
    };
    storeDocument = function(data, docName, first, blocks) {
      var sets;
      if (!blocks) {
        blocks = parseOrgMode(first);
        first = blocks[0]._id;
        sets = _.keyBy(blocks, '_id');
        data.linkAllSiblings({
          first: first,
          sets: sets
        });
      }
      return transaction(storeNameFor(docName)).then(function(t) {
        var block, i, index, j, len, len1, ref;
        if (clearIndices) {
          ref = t.store.indexNames;
          for (i = 0, len = ref.length; i < len; i++) {
            index = ref[i];
            store.deleteIndex(index);
          }
        }
        if (!store.indexNames.length) {
          store.createIndex('ids', '_id', {
            unique: true
          });
          store.createIndex('names', 'codeName');
        }
        t.put(first, 'first');
        for (j = 0, len1 = blocks.length; j < len1; j++) {
          block = blocks[j];
          t.put(block, block._id);
        }
        return null;
      });
    };
    LocalDoc = (function() {
      function LocalDoc(data) {
        this.clear = bind(this.clear, this);
        this.storeName = storeNameFor(data.baseDocName);
        data.addFilter;
      }

      LocalDoc.prototype.transaction = function(type) {
        return transaction(this.storeName, type);
      };

      LocalDoc.prototype.replaceBlock = function(data, oldBlock, newBlock, context) {
        return this.transaction().put(newBlock, newBlock._id);
      };

      LocalDoc.prototype.clear = function(data) {
        return this.transaction().clear();
      };

      return LocalDoc;

    })();
    return {
      initStorage: initStorage
    };
  });

}).call(this);

//# sourceMappingURL=storage.js.map