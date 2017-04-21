// Generated by CoffeeScript 1.12.4
(function() {
  define(['./org', './docOrg', 'lodash', './editorSupport', './diag', './testing'], function(Org, DocOrg, _, EditorSupport, Diag, Testing) {
    var OrgData, assert, assertEq, orgDoc, parseOrgMode, runTests, set1, structureInfo, test1;
    parseOrgMode = Org.parseOrgMode;
    orgDoc = DocOrg.orgDoc;
    OrgData = EditorSupport.OrgData;
    structureInfo = Diag.structureInfo;
    assert = Testing.assert, assertEq = Testing.assertEq;
    set1 = {
      text: "* Test properties\n#+BEGIN_SRC lisp :results dynamic\n(+ 3 4)\n#+END_SRC\n#+RESULTS:\n: 7\n** sub 1\nduh\n:properties:\n:a: 1\n:end:\n#+BEGIN_SRC js :results dynamic\n3 + 4\n#+END_SRC\n#+RESULTS:\n: 7\npeep\n:properties:\n:b: 2\n:end:\n** sub 2\nasdf",
      levels: {
        block0: 0,
        block1: 1,
        block2: 1,
        block3: 2,
        block4: 2,
        block5: 2,
        block6: 1,
        block7: 2
      }
    };
    runTests = function() {};
    test1 = function() {
      var blk, block, blocks, count, data, i, info, j, len;
      data = new OrgData();
      blocks = data.parseBlocks(set1.text);
      count = 0;
      for (i = j = 0, len = blocks.length; j < len; i = ++j) {
        block = blocks[i];
        block._id = 'block' + count++;
        if (i > 0) {
          block.prev = blocks[i - 1]._id;
          blocks[i - 1].next = block._id;
        }
      }
      blk = _.keyBy(blocks, '_id');
      data.linkAllSiblings({
        first: blocks[0]._id,
        sets: blk,
        oldBlocks: blk
      });
      data.load('', blocks[0]._id, blk);
      info = structureInfo(data);
      return assertEq("Bad levels computed for set1", info.levels, set1.levels);
    };
    return {
      runTests: runTests,
      assert: assert,
      assertEq: assertEq
    };
  });

}).call(this);

//# sourceMappingURL=tests.js.map
