###
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
###

###
Tests for Leisure
###

Error.stackTraceLimit = 20

require('source-map-support').install()
{
  readFile,
  writeFile,
} = require './base'
{
  define,
  scan,
  cons,
  Nil,
  json2Ast,
  ast2Json,
  getLitVal,
  getRefName,
  getLambdaBody,
  consFrom,
  setType,
  setDataType,
} = LZ = require './ast'
{run, runTests, assertParse, assertEval, assertEvalPrint, assertEq} = T = require './testing'
{gen} = require './gen'
{
  stateValues,
  runMonad,
  identity,
  defaultEnv,
  setValue,
  getValue,
} = require './runtime'

runLsr = (str)-> (runMonad L_runLine()(L_nil)(-> str)).tail()(->(x)-> throw x())(->(x)-> x())

global.runMonad = runMonad
global.setType = setType
global.setDataType = setDataType
global.defaultEnv = defaultEnv
global.identity = identity
require './generatedPrelude'
runTests 'Leisure Full Parser',
  fullParse1: ->
    assertEq String(runLsr "scanLineM 'a +'"), 'Cons[[Token("+", 2) Token("a", 0)]]'
    assertEq String(runLsr "scanLineM 'a + b'"), 'Cons[[Token("+", 2) Token("a", 0) Token("b", 4)]]'
  fullParse2: ->
    assertEq String(runLsr "scanLineM 'a + b + c'"), 'Cons[[Token("+", 6) [Token("+", 2) Token("a", 0) Token("b", 4)] Token("c", 8)]]'
  fullParse3: ->
    assertEq runLsr("1+2*3 >= 7 == true"), L_true()
  fullParse4: ->
    assertEq runLsr("\\\\ (a = []) . isNil a"), L_true()
    assertEq runLsr("\\\\ (a = [1 2 3]) . (head a) == 1"), L_true()
  fullParse5: ->
    assertEq runLsr("do (a = 3) a"), 3
    setValue 'fred', 5
    assertEq runLsr("do (a <- getValue 'fred') (a + 2)"), 7
  fullParse6: ->
    assertEq runLsr("\\\\\n  a = 3\n  .\n  a"), 3
  fullParse7: ->
    assertEq String(runLsr("simpleScanLine '\\\\\n  a = 3\n  .\n  a'")), 'Cons[Token("\\\\", 0) Parens(1, 9, Cons[Token("a", 4) Token("=", 6) Token("3", 8)]) Token(".", 12) Token("a", 16)]'
    assertEq String(runLsr("simpleScanLine 'head\n  cons\n    1\n    nil'")), 'Cons[Token("head", 0) Parens(4, 25, Cons[Token("cons", 7) Token("1", 16) Token("nil", 22)])]'
    assertEq runLsr("head\n  cons\n    1\n    nil"), 1

process.exit T.stats.failures