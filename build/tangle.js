// Generated by CoffeeScript 1.10.0
(function() {
  define(['./base', './org', './docOrg', './gen', './eval', 'lodash', 'handlebars', './advice', 'lib/js-yaml', 'lib/bluebird.min', 'immutable', 'lib/fingertree', 'lib/sha1'], function(Base, Org, DocOrg, Gen, Eval, _, Handlebars, Advice, Yaml, Bluebird, Immutable, FingerTree, SHA1) {
    var Promise, SourceMapConsumer, SourceMapGenerator, SourceNode, blockSource, codeBlocksFor, codeForBlock, defaultEnv, extractCode, getLeisurePromise, jsCodeFor, languageEnvMaker, nextGeneratedFileName, orgDoc, parseBlocks, parseOrgMode, parseYaml, shouldTangle, tangle, tangleBlock, tangleType, viewSource;
    parseOrgMode = Org.parseOrgMode;
    orgDoc = DocOrg.orgDoc, blockSource = DocOrg.blockSource, parseYaml = DocOrg.parseYaml;
    languageEnvMaker = Eval.languageEnvMaker, jsCodeFor = Eval.jsCodeFor, nextGeneratedFileName = Eval.nextGeneratedFileName, getLeisurePromise = Eval.getLeisurePromise;
    Promise = Bluebird.Promise;
    SourceNode = Gen.SourceNode, SourceMapConsumer = Gen.SourceMapConsumer, SourceMapGenerator = Gen.SourceMapGenerator;
    defaultEnv = Base.defaultEnv;
    parseBlocks = function(text) {
      if (text === '') {
        return [];
      } else {
        return orgDoc(parseOrgMode(text.replace(/\r\n/g, '\n')));
      }
    };
    codeBlocksFor = function(docText) {
      return _.filter(parseBlocks(docText), function(el) {
        return el.type === 'code' && el.language;
      });
    };
    extractCode = function(docText) {
      var base, block, code, codeString, curLang, env, err, error, extractedCode, j, len, pushCode, ref, ref1, ref2;
      extractedCode = [];
      curLang = '';
      codeString = '';
      pushCode = function(lang, code) {
        if (lang == null) {
          lang = curLang;
        }
        if (code == null) {
          code = codeString;
        }
        if (lang) {
          extractedCode.push({
            language: lang,
            code: code
          });
          return curLang = codeString = '';
        }
      };
      ref = codeBlocksFor(docText);
      for (j = 0, len = ref.length; j < len; j++) {
        block = ref[j];
        try {
          if (((ref1 = block.codeAttributes) != null ? (ref2 = ref1.tangle) != null ? ref2.toLowerCase() : void 0 : void 0) === 'yes') {
            if (block.language !== curLang) {
              if (curLang) {
                env = typeof (base = languageEnvMaker(block.language)) === "function" ? base(Object.create(defaultEnv)) : void 0;
                codeString = env.generateCode(codeString);
              }
              pushCode();
              curLang = block.language;
            }
            codeString += blockSource(block);
          } else if (code = tangleBlock(block)) {
            pushCode();
            pushCode(block.language, code);
          }
        } catch (error) {
          err = error;
          console.log("ERROR IN CODE: " + err + "\n" + block.text);
          throw err;
        }
      }
      if (codeString) {
        pushCode();
      }
      return extractedCode;
    };
    shouldTangle = function(block) {
      var ref;
      if ((block != null ? block.language : void 0) && block.codeAttributes) {
        if (((ref = block.codeAttributes.tangle) != null ? ref.toLowerCase() : void 0) === 'yes') {
          return 'tangle';
        } else {
          return tangleType(block);
        }
      }
    };
    tangleBlock = function(block) {
      var attr, code, gen, ref, type;
      if ((attr = block.codeAttributes) || block.language.toLowerCase() === 'yaml') {
        ref = codeForBlock(block), type = ref[0], code = ref[1];
        if (code) {
          gen = function(code) {
            var blockStr, con, fileName, nodes;
            if (code.code) {
              con = SourceMapConsumer.fromSourceMap(code.map);
              code = SourceNode.fromStringWithSourceMap(code.code, con);
              fileName = con.file || con.sources[0];
            } else {
              fileName = nextGeneratedFileName();
            }
            block.hash = SHA1.hash(block.text);
            blockStr = JSON.stringify(block);
            nodes = (function() {
              switch (type) {
                case 'yaml':
                  return ['this.tangleAddData(', blockStr, ', ', JSON.stringify(parseYaml(code.replace(/(^|\n): /gm, '$1'))), ');\n'];
                case 'view':
                  return ['this.tangleAddView(', blockStr, ', ', code, ');\n'];
                case 'observer':
                  return ['this.tangleAddObserver(', blockStr, ', ', code, ');\n'];
                case 'controller':
                  return ['this.tangleAddController(', blockStr, ', ', code, ');\n'];
                case 'def':
                  return ['this.tangleAddDef(', blockStr, ', ', code, ');\n'];
                default:
                  return null;
              }
            })();
            if (nodes) {
              console.log("FILE NAME: " + fileName);
              return new SourceNode(1, 0, fileName, nodes);
            }
          };
          if (code instanceof Promise) {
            return code.then(gen);
          } else {
            return gen(code);
          }
        }
      }
    };
    tangleType = function(block) {
      var attr, ref;
      if (false) {

      } else if (attr = block.codeAttributes) {
        return (((ref = attr.results) != null ? ref.toLowerCase() : void 0) === 'def' && 'def') || (attr.control && 'controller') || (attr.observe && 'observer');
      }
    };
    codeForBlock = function(block) {
      var attr, base, code, env, type;
      attr = block.codeAttributes;
      type = tangleType(block);
      code = !(type === 'view' || type === 'yaml' || type === 'observer' || type === 'controller' || type === 'def') ? null : type === 'view' ? viewSource(block) : type === 'yaml' ? blockSource(block) : (env = typeof (base = languageEnvMaker(block.language)) === "function" ? base(Object.create(defaultEnv)) : void 0, type === 'def' ? env.generateCode(blockSource(block)) : env.genBlock(block));
      return [type, code];
    };
    viewSource = function(block) {
      var source;
      source = blockSource(block);
      return JSON.stringify(source.substring(0, source.length - 1));
    };
    tangle = function(docText) {
      return getLeisurePromise().then(function() {
        var code, env, language;
        return Promise.join.apply(null, (function() {
          var base, j, len, ref, ref1, results1;
          ref = extractCode(docText);
          results1 = [];
          for (j = 0, len = ref.length; j < len; j++) {
            ref1 = ref[j], language = ref1.language, code = ref1.code;
            if (language === 'yaml') {
              results1.push(code);
            } else {
              if (!(env = typeof (base = languageEnvMaker(language)) === "function" ? base(Object.create(defaultEnv)) : void 0)) {
                throw new Error("Language '" + language + "' not supported");
              }
              results1.push(code);
            }
          }
          return results1;
        })()).then(function(results) {
          var code, i, map, n;
          n = new SourceNode();
          if (results.length) {
            n.add((function() {
              var j, len, ref, results1;
              results1 = [];
              for (i = j = 0, len = results.length; j < len; i = ++j) {
                ref = results[i], code = ref.code, map = ref.map;
                results1.push(!code ? results[i] : SourceNode.fromStringWithSourceMap(code, SourceMapConsumer.fromSourceMap(map)));
              }
              return results1;
            })());
          }
          return jsCodeFor(n.toStringWithSourceMap());
        })["catch"](function(err) {
          return console.log("PROMISE CAUGHT ERROR IN CODE: " + err + "\n" + code);
        });
      });
    };
    Object.assign(Leisure, {
      tangle: tangle,
      codeBlocksFor: codeBlocksFor,
      extractCode: extractCode
    });
    return {
      tangle: tangle,
      codeBlocksFor: codeBlocksFor,
      extractCode: extractCode,
      jsCodeFor: jsCodeFor,
      shouldTangle: shouldTangle
    };
  });

}).call(this);

//# sourceMappingURL=tangle.js.map
