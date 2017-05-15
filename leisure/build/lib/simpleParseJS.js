// Generated by CoffeeScript 1.10.0

/*
Copyright (C) 2013, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
 */

(function() {
  var L_parens, L_parseErr, L_token, Nil, _, addDelimiter, anno, apply, arity, ast2Json, baseDir, chainApply, charCodes, checkSetDataType, cleanTokens, compileFile, compileLine, cons, consFrom, createAnno, createApply, createAst, createDef, createLambda, createLet, createLitOrRef, createSublets, defPat, defaultEnv, define, delimiterList, delimiterListPrefix, delimiterPat, delimiters, dummyPosition, ensureLeisureClass, gen, genLine, getDelimiterInfo, getLetLambda, getLetNames, getNameAndDef, head, identity, isParens, isToken, isTokenStart, isTokenString, jsonForFile, lambda, lazy, lc, lexEnd, linesForFile, lit, llet, loc, lz, makeDelimterPat, makeMoreTokens, makeTokens, namesForLines, newCall, parens, parensContent, parensEnd, parensFromToks, parensStart, parse, parseErr, parseErrMsg, parseGroup, parseIndent, parseLine, parseString, parseToAst, parseTok, parseToks, path, position, ref, ref1, ref2, regexpEscapePat, requirejs, resolve, root, runMonad2, rz, scanLine, setDataType, setDataTypeAnno, setDelimiterInfo, setType, setTypeAnno, splitTokens, strip, stripParens, tail, tokListStr, token, tokenPos, tokenString, tokens, transformDef, withCons, withParens, withToken,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  path = require('path');

  baseDir = path.resolve(path.dirname(module.filename) + '/../../../build');

  requirejs = require('requirejs').config({
    baseUrl: baseDir,
    paths: {
      lib: baseDir + '/lib',
      immutable: baseDir + '/lib/immutable-3.8.1.min'
    }
  });

  ((typeof window !== 'undefined' && window) || global).Lazy = requirejs('lib/lazy');

  newCall = requirejs('base').newCall;

  ref1 = root = module.exports = requirejs('./ast'), cons = ref1.cons, Nil = ref1.Nil, consFrom = ref1.consFrom, head = ref1.head, tail = ref1.tail, define = ref1.define, setDataType = ref1.setDataType, setType = ref1.setType, ensureLeisureClass = ref1.ensureLeisureClass, ref = ref1.ref, lit = ref1.lit, apply = ref1.apply, lambda = ref1.lambda, llet = ref1.llet, anno = ref1.anno, ast2Json = ref1.ast2Json, resolve = ref1.resolve, lazy = ref1.lazy, dummyPosition = ref1.dummyPosition;

  rz = resolve;

  lz = lazy;

  lc = Leisure_call;

  ref2 = requirejs('./runtime'), runMonad2 = ref2.runMonad2, defaultEnv = ref2.defaultEnv, identity = ref2.identity;

  gen = requirejs('./gen').gen;

  _ = requirejs('lodash.min');

  delimiterListPrefix = /"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\n *|#.*/.source;

  delimiterList = ['\\(', '\\)', ' +', '\\.', '\\\\\\\\', '\\\\@', '\\\\'];

  delimiters = _.zipObject(_.map(delimiterList, function(x) {
    return [x, true];
  }));

  delimiterPat = null;

  getDelimiterInfo = function() {
    return _.clone(delimiterList);
  };

  setDelimiterInfo = function(info) {
    delimiterList = info;
    delimiters = _.zipObject(_.map(delimiterList, function(x) {
      return [x, true];
    }));
    return makeDelimterPat();
  };

  defPat = /^([^ =]+).*=/;

  makeDelimterPat = function() {
    _.sortBy(delimiters, function(x) {
      return -x.length;
    });
    return root.delimiterPat = delimiterPat = new RegExp("(" + delimiterListPrefix + "|" + (delimiterList.join('|')) + ")");
  };

  regexpEscapePat = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

  addDelimiter = function(del) {
    if (!delimiters[del]) {
      delimiters[del] = true;
      delimiterList.push(del.replace(regexpEscapePat, "\\$&"));
      return makeDelimterPat();
    }
  };

  makeDelimterPat();

  if (newCall) {
    L_token = setDataType((function(txt, pos) {
      return setType((function(f) {
        return lc(rz(f), txt, pos);
      }), 'token');
    }), 'token');
    tokenPos = function(t) {
      return t(lz(function(txt, pos) {
        return lz(pos);
      }));
    };
    token = function(str, pos) {
      return L_token(lz(str), lz(pos));
    };
    tokenString = function(t) {
      return t(lz(function(txt, pos) {
        return rz(txt);
      }));
    };
  } else {
    L_token = setDataType((function(txt) {
      return function(pos) {
        return setType((function(f) {
          return rz(f)(txt)(pos);
        }), 'token');
      };
    }), 'token');
    tokenPos = function(t) {
      return t(lz(function(txt) {
        return function(pos) {
          return lz(pos);
        };
      }));
    };
    token = function(str, pos) {
      return L_token(lz(str))(lz(pos));
    };
    tokenString = function(t) {
      return t(lz(function(txt) {
        return function(pos) {
          return rz(txt);
        };
      }));
    };
  }

  isToken = function(t) {
    return t instanceof Leisure_token;
  };

  if (newCall) {
    L_parens = setDataType((function(left, right, content) {
      return setType((function(f) {
        return lc(rz(f), left, right, content);
      }), 'parens');
    }), 'parens');
    parens = function(start, end, content) {
      if (content instanceof Leisure_cons && tail(content) === Nil) {
        return parens(start, end, head(content));
      } else if (isToken(content)) {
        return content;
      } else {
        return lc(L_parens, lz(start), lz(end), lz(content));
      }
    };
    parensFromToks = function(left, right, content) {
      var end, start;
      start = tokenPos(left);
      end = tokenPos(right) + tokenString(right).length;
      return lc(L_parens, lz(start), lz(end), lz(content));
    };
    parensStart = function(p) {
      return p(lz(function(s, e, l) {
        return rz(s);
      }));
    };
    parensEnd = function(p) {
      return p(lz(function(s, e, l) {
        return e;
      }));
    };
    parensContent = function(p) {
      return p(lz(function(s, e, l) {
        return rz(l);
      }));
    };
    isParens = function(p) {
      return p instanceof Leisure_parens;
    };
    stripParens = function(p) {
      if (isParens(p)) {
        return parensContent(p);
      } else {
        return p;
      }
    };
  } else {
    L_parens = setDataType((function(left) {
      return function(right) {
        return function(content) {
          return setType((function(f) {
            return rz(f)(left)(right)(content);
          }), 'parens');
        };
      };
    }), 'parens');
    parens = function(start, end, content) {
      if (content instanceof Leisure_cons && tail(content) === Nil) {
        return parens(start, end, head(content));
      } else if (isToken(content)) {
        return content;
      } else {
        return L_parens(lz(start))(lz(end))(lz(content));
      }
    };
    parensFromToks = function(left, right, content) {
      var end, start;
      start = tokenPos(left);
      end = tokenPos(right) + tokenString(right).length;
      return L_parens(lz(start))(lz(end))(lz(content));
    };
    parensStart = function(p) {
      return p(lz(function(s) {
        return function(e) {
          return function(l) {
            return rz(s);
          };
        };
      }));
    };
    parensEnd = function(p) {
      return p(lz(function(s) {
        return function(e) {
          return function(l) {
            return e;
          };
        };
      }));
    };
    parensContent = function(p) {
      return p(lz(function(s) {
        return function(e) {
          return function(l) {
            return rz(l);
          };
        };
      }));
    };
    isParens = function(p) {
      return p instanceof Leisure_parens;
    };
    stripParens = function(p) {
      if (isParens(p)) {
        return parensContent(p);
      } else {
        return p;
      }
    };
  }

  L_parseErr = setDataType((function(msg) {
    return setType((function(f) {
      return rz(f)(msg);
    }), 'parseErr');
  }), 'parseErr');

  ensureLeisureClass('parseErr');

  Leisure_parseErr.prototype.toString = function() {
    return "ParseErr(" + (JSON.stringify(parseErrMsg(this))) + ")";
  };

  parseErr = function(msg) {
    throw new Error(msg);
  };

  parseErrMsg = function(e) {
    return e(lz(function(msg) {
      return rz(msg);
    }));
  };

  makeTokens = function(strings, start) {
    if (strings === Nil) {
      return Nil;
    } else {
      return makeMoreTokens(strings, start);
    }
  };

  makeMoreTokens = function(strings, start) {
    var first, ref3;
    first = head(strings);
    if (ref3 = first[0], indexOf.call(' #', ref3) >= 0) {
      return makeTokens(tail(strings), start + first.length);
    } else if (first[0] === '\n' && (head(tail(strings)))[0] === '#') {
      return makeTokens(tail(tail(strings)), start + first.length + (head(tail(strings)).length));
    } else {
      return cons(token(first, start), makeTokens(tail(strings), start + first.length));
    }
  };

  splitTokens = function(str) {
    return consFrom(_.filter(str.split(delimiterPat), function(s) {
      return s.length;
    }));
  };

  tokens = function(str) {
    return makeTokens(splitTokens(str), 0);
  };

  isTokenString = function(t, str) {
    return isToken(t) && tokenString(t) === str;
  };

  isTokenStart = function(t, str) {
    return isToken(t) && tokenString(t).substring(0, str.length) === str;
  };

  withCons = function(l, nilCase, cont) {
    if (l instanceof Leisure_cons) {
      return cont(head(l), tail(l));
    } else {
      return nilCase();
    }
  };

  parseToks = function(toks, cont) {
    if (toks === Nil) {
      return cont(Nil);
    } else {
      return parseTok(toks, function(h, t) {
        return parseToks(t, function(res) {
          return cont(cons(h, res));
        });
      });
    }
  };

  parseTok = function(toks, cont) {
    return withCons(toks, (function() {
      return Nil;
    }), function(h, t) {
      if (isTokenString(h, '(')) {
        return parseGroup(h, t, Nil, cont);
      } else if (isTokenStart(h, '\n')) {
        return parseIndent(h, t, Nil, cont);
      } else {
        return cont(h, t);
      }
    });
  };

  parseGroup = function(left, toks, gr, cont) {
    return withCons(toks, (function() {
      return parseErr("Unterminated group starting at " + (tokenPos(left)));
    }), function(h, t) {
      if (isTokenString(h, ')')) {
        return cont(parensFromToks(left, h, gr.reverse()), t);
      } else {
        return parseTok(toks, function(restH, restT) {
          return parseGroup(left, restT, cons(restH, gr), cont);
        });
      }
    });
  };

  parseIndent = function(indent, toks, gr, cont) {
    return withCons(toks, (function() {
      return cont(parens(tokenPos(indent), lexEnd(head(gr)), gr.reverse()), Nil);
    }), function(h, t) {
      if (isTokenString(h, ')') || (isTokenStart(h, '\n') && tokenString(h).length <= tokenString(indent).length)) {
        return cont(parens(tokenPos(indent), tokenPos(h), gr.reverse()), toks);
      } else {
        return parseTok(toks, function(restH, restT) {
          return parseIndent(indent, restT, cons(restH, gr), cont);
        });
      }
    });
  };

  identity = function(x) {
    return x;
  };

  parse = function(str) {
    return parseIndent(token('\n', 0), tokens(str), Nil, function(h, t) {
      return stripParens(h);
    });
  };

  parseToAst = function(str) {
    return createAst(parse(str), Nil, identity);
  };

  withToken = function(tok, nonTokenCase, cont) {
    if (isToken(tok)) {
      return cont(tokenString(tok));
    } else {
      return nonTokenCase();
    }
  };

  withParens = function(p, err, cont) {
    if (isParens(p)) {
      return cont(parensContent(p));
    } else {
      return err();
    }
  };

  strip = function(list, cont) {
    return withParens(list, (function() {
      return cont(list);
    }), function(c) {
      return strip(c, cont);
    });
  };

  position = function(thing) {
    if (isToken(thing)) {
      return tokenPos(thing);
    } else if (isParens(thing)) {
      return parensStart(thing);
    } else if (thing instanceof Leisure_cons) {
      return position(head(thing));
    } else {
      return -1;
    }
  };

  lexEnd = function(thing) {
    if (isToken(thing)) {
      return tokenPos(thing) + tokenString(thing).length;
    } else if (isParens(thing)) {
      return parensEnd(thing);
    } else if (thing instanceof Leisure_cons) {
      return lexEnd(thing.last());
    } else {
      return -1;
    }
  };

  loc = function(thing) {
    var p;
    p = position(thing);
    return "at " + (p === -1 ? 'an unknown location' : p);
  };

  createAst = function(inList, names, cont) {
    return strip(inList, function(list) {
      if (isToken(list)) {
        return createLitOrRef(tokenString(list), names, cont);
      } else {
        return withCons(list, (function() {
          return cont(Nil);
        }), function(h, t) {
          if (isTokenString(h, '\\\\')) {
            return createLet(h, t, names, cont);
          } else if (isTokenString(h, '\\@')) {
            return createAnno(h, t, names, cont);
          } else if (isTokenString(h, '\\')) {
            return createLambda(h, t, names, cont);
          } else {
            return createApply(list, names, cont);
          }
        });
      }
    });
  };

  createLitOrRef = function(tok, names, cont) {
    var err, error, ref3;
    if (names.find(function(el) {
      return el === tok;
    }) !== Nil) {
      return cont(ref(tok, dummyPosition));
    } else {
      try {
        if (ref3 = tok[0], indexOf.call("\"'", ref3) >= 0) {
          return cont(lit(parseString(tok.substring(1, tok.length - 1)), dummyPosition));
        } else if ((tok[0] >= '0' && tok[0] <= '9') || tok[0] === '-') {
          return cont(lit(JSON.parse(tok), dummyPosition));
        } else {
          return cont(ref(tok, dummyPosition));
        }
      } catch (error) {
        err = error;
        return cont(ref(tok, dummyPosition));
      }
    }
  };

  charCodes = {
    "b": '\b',
    "f": '\f',
    "n": '\n',
    "r": '\r',
    "t": '\t',
    "v": '\v',
    "'": '\'',
    "\"": '\"',
    "\\": '\\'
  };

  parseString = function(str) {
    var i, parseCode, res;
    res = '';
    i = 0;
    parseCode = function(pat, radix) {
      var code;
      code = str.substring(i).match(pat)[0];
      res += String.fromCharCode(parseInt(code, radix));
      return i += code.length;
    };
    while (i < str.length) {
      if (str[i] === '\\') {
        i++;
        if (str[i] >= '0' && str[i] <= '9') {
          parseCode(/[0-9]+/, 8);
        } else if (str[i] === 'x') {
          i++;
          parseCode(/[0-9a-fA-F][0-9a-fA-F]/, 16);
        } else if (str[i] === 'u') {
          i++;
          parseCode(/[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]/, 16);
        } else if (!charCodes[str[i]]) {
          throw new Error("Unknown character escape: \\" + str[i]);
        } else {
          res += charCodes[str[i++]];
        }
      } else {
        res += str[i++];
      }
    }
    return res;
  };

  createLambda = function(start, list, names, cont) {
    return withCons(list, (function() {
      return parseErr("No variable or body for lambda " + (loc(start)));
    }), function(name, rest) {
      return withCons(rest, (function() {
        return parseErr("No body for lambda " + (loc(start)));
      }), function(dot, body) {
        return withToken(name, (function() {
          return parseErr("Expecting name for lambda " + (loc(start)));
        }), function(n) {
          if (isTokenString(dot, '.')) {
            return createAst(body, cons(n, names), function(bodyAst) {
              return cont(lambda(n, bodyAst, dummyPosition));
            });
          } else {
            return createLambda(start, rest, cons(n, names), function(bodyAst) {
              return cont(lambda(n, bodyAst, dummyPosition));
            });
          }
        });
      });
    });
  };

  createAnno = function(start, list, names, cont) {
    return withCons(list, (function() {
      return parseErr("No annotation name or data in annotation " + (loc(start)));
    }), function(name, rest) {
      return withCons(rest, (function() {
        return parseErr("No data for annotation " + (loc(start)));
      }), function(data, rest) {
        var finish;
        finish = function(data, body) {
          return createAst(body, names, function(bodyAst) {
            return cleanTokens(start, name, function(name) {
              return cleanTokens(start, data, function(data) {
                return cont(anno(name, data, bodyAst, dummyPosition));
              });
            });
          });
        };
        if (isTokenString(data, '.')) {
          return finish(Nil, rest);
        } else {
          return strip(data, function(data) {
            return withCons(rest, (function() {
              return parseErr("No body for annotation " + (loc(start)));
            }), function(dot, body) {
              if (isTokenString(dot, '.')) {
                return finish(data, body);
              } else {
                return parseErr("Annotation expected dot after name and data");
              }
            });
          });
        }
      });
    });
  };

  cleanTokens = function(start, toks, cont) {
    if (isToken(toks)) {
      return cont(tokenString(toks));
    } else {
      return withCons(toks, (function() {
        return cont(toks);
      }), function(head, tail) {
        return cleanTokens(start, head, function(head) {
          return cleanTokens(start, tail, function(tail) {
            return cont(cons(head, tail));
          });
        });
      });
    }
  };

  createApply = function(inList, names, cont) {
    return strip(inList, function(list) {
      return withCons(list, (function() {
        return parseErr("Expecting a non-empty list " + (loc(inList)));
      }), function(h, t) {
        return createAst(h, names, function(func) {
          return chainApply(func, t, names, cont);
        });
      });
    });
  };

  chainApply = function(func, list, names, cont) {
    return withCons(list, (function() {
      return cont(func);
    }), function(argItem, rest) {
      var ref3;
      if (isToken(argItem) && ((ref3 = tokenString(argItem)) === '\\' || ref3 === '\\\\' || ref3 === '\\@')) {
        return createAst(list, names, function(arg) {
          return cont(apply(func, arg, dummyPosition));
        });
      } else {
        return createAst(argItem, names, function(arg) {
          return chainApply(apply(func, arg, dummyPosition), rest, names, cont);
        });
      }
    });
  };

  createLet = function(start, list, names, cont) {
    return withCons(list, (function() {
      return parseErr("No variable or body for let " + (loc(start)));
    }), function(binding, body) {
      if (body === Nil) {
        return createAst(binding, names, cont);
      } else {
        return getLetNames(start, list, names, function(newNames) {
          return createSublets(start, binding, body, newNames, cont);
        });
      }
    });
  };

  getLetNames = function(start, list, names, cont) {
    return withCons(list, (function() {
      return cont(names);
    }), function(binding, body) {
      if (isTokenString(binding, '.')) {
        return cont(names);
      } else {
        return withParens(binding, (function() {
          return parseErr("Let expected binding, but no parens or indented line at " + (loc(start)));
        }), function(def) {
          return withCons(def, (function() {
            return parseErr("Let expected binding, but no list " + (loc(start)));
          }), function(name, rest) {
            return withToken(name, (function() {
              return parseErr("Let expected binding but no name " + (loc(start)));
            }), function(str) {
              return getLetNames(start, body, cons(str, names), cont);
            });
          });
        });
      }
    });
  };

  createSublets = function(start, binding, body, names, cont) {
    if (isTokenString(binding, '.')) {
      return createAst(body, names, cont);
    } else {
      return withCons(body, (function() {
        return parseErr("Let expected a body");
      }), function(bodyH, bodyT) {
        return getNameAndDef(parensStart(binding), parensContent(binding), names, function(name, def) {
          return createSublets(start, bodyH, bodyT, names, function(bodyAst) {
            return cont(llet(tokenString(name), def, bodyAst, dummyPosition));
          });
        });
      });
    }
  };

  getNameAndDef = function(pos, binding, names, cont) {
    return withCons(tail(binding), (function() {
      return parseErr("Let expected binding at " + pos);
    }), function(snd, sndT) {
      if (isTokenString(snd, '=')) {
        return createAst(sndT, names, function(def) {
          return cont(head(binding), def);
        });
      } else {
        return getLetLambda(pos, tail(binding), Nil, names, function(lamb) {
          return cont(head(binding), lamb);
        });
      }
    });
  };

  getLetLambda = function(pos, def, args, names, cont) {
    return withCons(def, (function() {
      return parseErr("Let expected binding at " + pos);
    }), function(arg, rest) {
      if (!isToken(arg)) {
        return parseErr("Let expected binding at " + pos);
      } else if (isTokenString(arg, '=')) {
        return createAst(cons(token('\\', pos), args.reverse()).append(cons(token('.', position(arg)), rest)), names, cont);
      } else {
        return getLetLambda(pos, rest, cons(arg, args), names, cont);
      }
    });
  };

  scanLine = function(str, isDef, isExpr) {
    var err, error, func, name, toks;
    try {
      toks = tokens(str);
      if (str.match(defPat)) {
        name = head(toks);
        func = isTokenString(head(tail(toks)), '=') ? isTokenString(head(tail(tail(toks))), '\\') ? setTypeAnno(head(tail(tail(toks))), tail(tail(toks)), tokenString(name)) : tail(tail(toks)) : cons(token('\\', position(head(tail(toks))) - 1), transformDef(name, tail(toks)));
        return parseToks(checkSetDataType(func, tail(toks), name), function(list) {
          return isDef(createDef(list, name, arity(tail(toks), 0), str));
        });
      } else {
        return parseToks(toks, function(list) {
          return isExpr(list);
        });
      }
    } catch (error) {
      err = error;
      console.log("Error parsing <" + str + ">, " + err.message);
      err.message = "Error parsing <" + str + ">, " + err.message;
      throw err;
    }
  };

  parseLine = function(str, names, isDef, isExpr) {
    var astCallback;
    astCallback = function(cb) {
      return function(list) {
        return createAst(list, names, function(ast) {
          return cb(ast);
        });
      };
    };
    return scanLine(str, astCallback(isDef), astCallback(isExpr));
  };

  genLine = function(str, names, isDef, isExpr) {
    return parseLine(str, names, (function(ast) {
      return isDef(gen(ast));
    }), (function(ast) {
      return isExpr(gen(ast));
    }));
  };

  compileLine = function(str, names, isDef, isExpr) {
    return genLine(str, names, (function(code) {
      return runMonad2(eval("(" + code + ")"), defaultEnv, isDef);
    }), (function(code) {
      return runMonad2(eval("(" + code + ")"), defaultEnv, isExpr);
    }));
  };

  transformDef = function(name, toks) {
    if (isTokenString(head(toks), '=')) {
      if (isTokenString(head(tail(toks)), '\\')) {
        return cons(token('.', position(head(toks))), setTypeAnno(head(tail(toks)), tail(toks), tokenString(name)));
      } else {
        return cons(token('.', position(head(toks))), tail(toks));
      }
    } else {
      return cons(head(toks), transformDef(name, tail(toks)));
    }
  };

  setTypeAnno = function(start, toks, name) {
    var pos, tok;
    pos = position(start);
    tok = function(str) {
      return token(str, pos);
    };
    return cons(tok('\\@'), cons(tok('type'), cons(tok(name), cons(tok('.'), toks))));
  };

  createDef = function(def, name, arity, src) {
    var tok;
    tok = function(str) {
      return token(str, position(def));
    };
    return cons(tok('define'), cons(tok(JSON.stringify(tokenString(name))), cons(tok(String(arity)), cons(tok(JSON.stringify(src)), cons(cons(def, Nil), Nil)))));
  };

  checkSetDataType = function(toks, curToks, name) {
    if (isTokenString(head(curToks), '=')) {
      if (isTokenString(head(tail(curToks)), '\\')) {
        return setDataTypeAnno(toks, name);
      } else {
        return toks;
      }
    } else {
      return checkSetDataType(toks, tail(curToks), name);
    }
  };

  setDataTypeAnno = function(toks, name) {
    var pos;
    pos = position(toks);
    return cons(token('\\@', pos), cons(token('dataType', pos), cons(token(tokenString(name), pos), cons(token('.', pos), toks))));
  };

  arity = function(toks, n) {
    if (isTokenString(head(toks), '=')) {
      return n;
    } else {
      return arity(tail(toks), n + 1);
    }
  };

  tokListStr = function(toks) {
    return JSON.stringify(toks.map(function(t) {
      return tokenString(t);
    }).join(' '));
  };

  linesForFile = function(text) {
    return _.filter(text.replace(/\r/g, '').split(/\n(?=[^ ]|$)/), function(line) {
      return !line.match(/^[ \i]*\#.*|^[ \i]*$|^\n[ \i]*$/);
    });
  };

  namesForLines = function(lines) {
    return _.reduce(lines, (function(result, line) {
      var m;
      if (m = line.match(defPat)) {
        return cons(m[1], result);
      } else {
        return result;
      }
    }), Nil);
  };

  compileFile = function(text, filename) {
    var id, lines, names;
    id = function(x) {
      return x;
    };
    lines = linesForFile(text);
    names = namesForLines(lines);
    return "'use strict';\ndefine([], function(){\n  if (typeof module != 'undefined') require('source-map-support').install();\n  return L_runMonads([\n    " + _.map(lines, function(line) {
      return "function(){return " + (genLine(line.trim(), names, id, id)) + ";}";
    }).join(', \n    ') + (filename ? "\n  ]);\n});\n//@ sourceURL=" + filename + "\n" : "");
  };

  jsonForFile = function(text) {
    var id, lines, names;
    id = function(x) {
      return x;
    };
    lines = linesForFile(text);
    names = namesForLines(lines);
    return _.map(lines, function(line) {
      return JSON.stringify(ast2Json(parseLine(line, names, id, id)));
    }).join('\n');
  };

  root.splitTokens = splitTokens;

  root.tokens = tokens;

  root.tokenString = tokenString;

  root.parse = parse;

  root.parseToAst = parseToAst;

  root.compileLine = compileLine;

  root.parseLine = parseLine;

  root.scanLine = scanLine;

  root.genLine = genLine;

  root.compileFile = compileFile;

  root.jsonForFile = jsonForFile;

  root.linesForFile = linesForFile;

  root.getDelimiterInfo = getDelimiterInfo;

  root.setDelimiterInfo = setDelimiterInfo;

  root.addDelimiter = addDelimiter;

}).call(this);

//# sourceMappingURL=simpleParseJS.js.map
