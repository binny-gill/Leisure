var parseAst = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  parseAst = root = {};
  global = window;
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Leisure = require('./leisure');
  Leisure.req('./std');
  require('./prim');
  ReplCore = require('./replCore');
  Repl = require('./repl');
}
root.defs = {};
root.tokenDefs = [];
root.macros = {};

setType = Leisure.setType;
var setDataType = Leisure.setDataType;
var define = Leisure.define;
var defineMacro = Leisure.defineMacro;
var defineToken = Leisure.defineToken;
var processResult = Repl.processResult;
var setContext = Leisure.setContext;
var funcContext = Leisure.funcContext;
var Nil = Leisure.Nil;
var cons = Leisure.cons;
var _make$_node, _node$_svg, _node$_width, _node$_height, _node$_root$_x, _node$_root$_y, _node$_translate, _node$_line, _astFor, _treeForNotebook, _rangeContainsRange, _shouldHighlight, _highlight, _treeForFunc, _treeFor, _treeForWith, _nodeFor, _redStyle, _greenStyle, _blueStyle, _createLambdaNode, _createApplyNode, _createRefNode, _createLitNode, _textNode, _typeof;
processResult(//AST(forward notebookSelection)
(_forward()((function(){return "notebookSelection"}))));
//make-node = AST(\svg width height root-x root-y f . f svg width height root-x root-y)
root.defs._make$_node = _make$_node = Leisure.define('make-node', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('make-node', 16), ctx)
   try {
     return Leisure.setDataType(function(_svg){return function(_width){return function(_height){return function(_root$_x){return function(_root$_y){return Leisure.setType(function(_f){return _f()(_svg)(_width)(_height)(_root$_x)(_root$_y);}, 'make-node');};};};};}, 'make-node');
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 5, "\\svg. \\width. \\height. \\root-x. \\root-y. \\f . f svg width height root-x root-y");
;
//node-svg = AST(\st . st \svg width height root-x root-y . svg)
root.defs._node$_svg = _node$_svg = Leisure.define('node-svg', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('node-svg', 8), ctx)
   try {
     return function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$_x){return function(_root$_y){return _svg();};};};};}))})})());};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\st. st \\svg width height root-x root-y . svg");
;
//node-width = AST(\st . st \svg width height root-x root-y . width)
root.defs._node$_width = _node$_width = Leisure.define('node-width', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('node-width', 8), ctx)
   try {
     return function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$_x){return function(_root$_y){return _width();};};};};}))})})());};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\st. st \\svg width height root-x root-y . width");
;
//node-height = AST(\st . st \svg width height root-x root-y . height)
root.defs._node$_height = _node$_height = Leisure.define('node-height', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('node-height', 8), ctx)
   try {
     return function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$_x){return function(_root$_y){return _height();};};};};}))})})());};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\st. st \\svg width height root-x root-y . height");
;
//node-root-x = AST(\st . st \svg width height root-x root-y . root-x)
root.defs._node$_root$_x = _node$_root$_x = Leisure.define('node-root-x', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('node-root-x', 8), ctx)
   try {
     return function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$_x){return function(_root$_y){return _root$_x();};};};};}))})})());};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\st. st \\svg width height root-x root-y . root-x");
;
//node-root-y = AST(\st . st \svg width height root-x root-y . root-y)
root.defs._node$_root$_y = _node$_root$_y = Leisure.define('node-root-y', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('node-root-y', 8), ctx)
   try {
     return function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$_x){return function(_root$_y){return _root$_y();};};};};}))})})());};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\st. st \\svg width height root-x root-y . root-y");
;
//node-translate = AST(\st x y . st \svg width height root-x root-y . make-node (translate svg x y) width height (+ root-x x) (+ root-y y))
root.defs._node$_translate = _node$_translate = Leisure.define('node-translate', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('node-translate', 34), ctx)
   try {
     return function(_st){return function(_x){return function(_y){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$_x){return function(_root$_y){return _make$_node()((function(){var $m; return (function(){return $m || ($m = (_translate()(_svg)(_x)(_y)))})})())(_width)(_height)((function(){var $m; return (function(){return $m || ($m = (_$o()(_root$_x)(_x)))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()(_root$_y)(_y)))})})());};};};};}))})})());};};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 3, "\\st. \\x. \\y. st \\svg width height root-x root-y . make-node\n  translate svg x y\n  width\n  height\n  + root-x x\n  + root-y y");
;
//node-line = AST(\n1 n2 . n1 \s1 w1 h1 x1 y1 . n2 \s2 w2 h2 x2 y2 . line ([ ([ x1 | x1 ]) , ([ y1 | y1 ]) , ([ x2 | x2 ]) , ([ y2 | y2 ]) | default-line-map ]))
root.defs._node$_line = _node$_line = Leisure.define('node-line', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('node-line', 70), ctx)
   try {
     return function(_n1){return function(_n2){return _n1()((function(){var $m; return (function(){return $m || ($m = (function(_s1){return function(_w1){return function(_h1){return function(_x1){return function(_y1){return _n2()((function(){var $m; return (function(){return $m || ($m = (function(_s2){return function(_w2){return function(_h2){return function(_x2){return function(_y2){return _line()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "x1"}))(_$q)(_x1)(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "y1"}))(_$q)(_y1)(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "x2"}))(_$q)(_x2)(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "y2"}))(_$q)(_y2)(_$s)))})})())(_$q)(_default$_line$_map)(_$s)))})})());};};};};}))})})());};};};};}))})})());};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\n1. \\n2. n1 \\s1 w1 h1 x1 y1 . n2 \\s2 w2 h2 x2 y2 .\n  line [['x1'|x1],['y1'|y1],['x2'|x2],['y2'|y2]|default-line-map]");
;
//astFor = AST(\func . isFunc func (funcSource func \src . parse src (right no source)) (left (lit func)))
root.defs._astFor = _astFor = Leisure.define('astFor', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('astFor', 22), ctx)
   try {
     return function(_func){return _isFunc()(_func)((function(){var $m; return (function(){return $m || ($m = (_funcSource()(_func)((function(){var $m; return (function(){return $m || ($m = (function(_src){return _parse()(_src);}))})})())((function(){var $m; return (function(){return $m || ($m = (_right()((function(){return "no source"}))))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_left()((function(){var $m; return (function(){return $m || ($m = (_lit()(_func)))})})())))})})());};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\func. isFunc func\n  funcSource func (\\src . parse src) (right 'no source')\n  left (lit func)");
;
//treeForNotebook = AST(\func . bind (notebookSelection func) \s . printValue (astFor func \ast . treeForWith ast \ast map . s \start end . shouldHighlight ast start end (highlight map) map map \ignore . concat ([ no source for  func ])))
root.defs._treeForNotebook = _treeForNotebook = Leisure.define('treeForNotebook', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('treeForNotebook', 50), ctx)
   try {
     return function(_func){return _bind()((function(){var $m; return (function(){return $m || ($m = (_notebookSelection()(_func)))})})())((function(){var $m; return (function(){return $m || ($m = (function(_s){return _printValue()((function(){var $m; return (function(){return $m || ($m = (_astFor()(_func)((function(){var $m; return (function(){return $m || ($m = (function(_ast){return _treeForWith()(_ast)((function(){var $m; return (function(){return $m || ($m = (function(_ast){return function(_map){return _s()((function(){var $m; return (function(){return $m || ($m = (function(_start){return function(_end){return _shouldHighlight()(_ast)(_start)(_end)((function(){var $m; return (function(){return $m || ($m = (_highlight()(_map)))})})())(_map);};}))})})())(_map);};}))})})());}))})})())((function(){var $m; return (function(){return $m || ($m = (function(_ignore){return _concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "no source for "}))(_func)(_$s)))})})());}))})})())))})})());}))})})());};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\func. do\n  s <- notebookSelection func\n  printValue\n    astFor func\n      \\ast . treeForWith ast \\ast map . s (\\start end . (shouldHighlight ast start end) (highlight map) map) map\n      \\ignore . concat ['no source for ' func]");
;
//rangeContainsRange = AST(\start end innerStart innerEnd . and (lte start innerStart) (lte innerEnd end))
root.defs._rangeContainsRange = _rangeContainsRange = Leisure.define('rangeContainsRange', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('rangeContainsRange', 16), ctx)
   try {
     return function(_start){return function(_end){return function(_innerStart){return function(_innerEnd){return _and()((function(){var $m; return (function(){return $m || ($m = (_lte()(_start)(_innerStart)))})})())((function(){var $m; return (function(){return $m || ($m = (_lte()(_innerEnd)(_end)))})})());};};};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 4, "\\start. \\end. \\innerStart. \\innerEnd. and (lte start innerStart) (lte innerEnd end)");
;
//shouldHighlight = AST(\ast start end . (\astStart . (\astEnd . or (rangeContainsRange start end astStart astEnd) (or (and (or (eq lit (getType ast id id)) (eq ref (getType ast id id))) (rangeContainsRange astStart astEnd start end)) (and (eq lambda (getType ast id id)) (rangeContainsRange astStart (+ astStart (strlen (ast \v b . v))) start end)))) (ast-end ast)) (ast-start ast))
root.defs._shouldHighlight = _shouldHighlight = Leisure.define('shouldHighlight', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('shouldHighlight', 97), ctx)
   try {
     return function(_ast){return function(_start){return function(_end){return function(_astStart){return function(_astEnd){return _or()((function(){var $m; return (function(){return $m || ($m = (_rangeContainsRange()(_start)(_end)(_astStart)(_astEnd)))})})())((function(){var $m; return (function(){return $m || ($m = (_or()((function(){var $m; return (function(){return $m || ($m = (_and()((function(){var $m; return (function(){return $m || ($m = (_or()((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){return "lit"}))((function(){var $m; return (function(){return $m || ($m = (_getType()(_ast)(_id)(_id)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){return "ref"}))((function(){var $m; return (function(){return $m || ($m = (_getType()(_ast)(_id)(_id)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_rangeContainsRange()(_astStart)(_astEnd)(_start)(_end)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_and()((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){return "lambda"}))((function(){var $m; return (function(){return $m || ($m = (_getType()(_ast)(_id)(_id)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_rangeContainsRange()(_astStart)((function(){var $m; return (function(){return $m || ($m = (_$o()(_astStart)((function(){var $m; return (function(){return $m || ($m = (_strlen()((function(){var $m; return (function(){return $m || ($m = (_ast()((function(){var $m; return (function(){return $m || ($m = (function(_v){return function(_b){return _v();};}))})})())))})})())))})})())))})})())(_start)(_end)))})})())))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_ast$_end()(_ast)))})})());}((function(){var $m; return (function(){return $m || ($m = (_ast$_start()(_ast)))})})());};};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 3, "\\ast. \\start. \\end. do\n  astStart = ast-start ast\n  astEnd = ast-end ast\n  or\n    rangeContainsRange start end astStart astEnd\n    or\n      and\n        or (eq 'lit' (getType ast id id)) (eq 'ref' (getType ast id id))\n        rangeContainsRange astStart astEnd start end\n      and\n        eq 'lambda' (getType ast id id)\n        rangeContainsRange astStart (+ astStart (strlen (ast \\v b . v))) start end");
;
//highlight = AST(\map . (\c . eq c #fcc (add-hash fill red map) (eq c #cfc (add-hash fill green map) (eq c #ccf (add-hash fill blue map) map))) (get-value fill map))
root.defs._highlight = _highlight = Leisure.define('highlight', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('highlight', 50), ctx)
   try {
     return function(_map){return function(_c){return _eq()(_c)((function(){return "#fcc"}))((function(){var $m; return (function(){return $m || ($m = (_add$_hash()((function(){return "fill"}))((function(){return "red"}))(_map)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_c)((function(){return "#cfc"}))((function(){var $m; return (function(){return $m || ($m = (_add$_hash()((function(){return "fill"}))((function(){return "green"}))(_map)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_c)((function(){return "#ccf"}))((function(){var $m; return (function(){return $m || ($m = (_add$_hash()((function(){return "fill"}))((function(){return "blue"}))(_map)))})})())(_map)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_get$_value()((function(){return "fill"}))(_map)))})})());};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\map. do\n  c = get-value 'fill' map\n  eq c '#fcc'\n    add-hash 'fill' 'red' map\n    eq c '#cfc'\n      add-hash 'fill' 'green' map\n      eq c '#ccf'\n        add-hash 'fill' 'blue' map\n        map");
;
//treeForFunc = AST(\func . treeFor (parse (funcSource func id false) id false))
root.defs._treeForFunc = _treeForFunc = Leisure.define('treeForFunc', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('treeForFunc', 15), ctx)
   try {
     return function(_func){return _treeFor()((function(){var $m; return (function(){return $m || ($m = (_parse()((function(){var $m; return (function(){return $m || ($m = (_funcSource()(_func)(_id)(_false)))})})())(_id)(_false)))})})());};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\func. treeFor (parse (funcSource func id false) id false)");
;
//treeFor = AST(\ast . treeForWith ast \ast map . map)
root.defs._treeFor = _treeFor = Leisure.define('treeFor', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('treeFor', 7), ctx)
   try {
     return function(_ast){return _treeForWith()(_ast)((function(){var $m; return (function(){return $m || ($m = (function(_ast){return function(_map){return _map();};}))})})());};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\ast. treeForWith ast \\ast map . map");
;
//treeForWith = AST(\ast mapFunc . node-svg (nodeFor ast mapFunc))
root.defs._treeForWith = _treeForWith = Leisure.define('treeForWith', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('treeForWith', 8), ctx)
   try {
     return function(_ast){return function(_mapFunc){return _node$_svg()((function(){var $m; return (function(){return $m || ($m = (_nodeFor()(_ast)(_mapFunc)))})})());};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\ast. \\mapFunc. node-svg (nodeFor ast mapFunc)");
;
//nodeFor = AST(\ast mapFunc . (\t . eq t lit (createLitNode ast (pretty (ast id)) mapFunc) (eq t ref (createRefNode ast (pretty (ast id)) mapFunc) (eq t lambda (ast \v b . createLambdaNode ast v b mapFunc) (eq t apply (ast \f a . createApplyNode ast f a mapFunc) (make-node (svg-node ) 0 0 0 0))))) (typeof ast))
root.defs._nodeFor = _nodeFor = Leisure.define('nodeFor', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('nodeFor', 95), ctx)
   try {
     return function(_ast){return function(_mapFunc){return function(_t){return _eq()(_t)((function(){return "lit"}))((function(){var $m; return (function(){return $m || ($m = (_createLitNode()(_ast)((function(){var $m; return (function(){return $m || ($m = (_pretty()((function(){var $m; return (function(){return $m || ($m = (_ast()(_id)))})})())))})})())(_mapFunc)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_t)((function(){return "ref"}))((function(){var $m; return (function(){return $m || ($m = (_createRefNode()(_ast)((function(){var $m; return (function(){return $m || ($m = (_pretty()((function(){var $m; return (function(){return $m || ($m = (_ast()(_id)))})})())))})})())(_mapFunc)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_t)((function(){return "lambda"}))((function(){var $m; return (function(){return $m || ($m = (_ast()((function(){var $m; return (function(){return $m || ($m = (function(_v){return function(_b){return _createLambdaNode()(_ast)(_v)(_b)(_mapFunc);};}))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_t)((function(){return "apply"}))((function(){var $m; return (function(){return $m || ($m = (_ast()((function(){var $m; return (function(){return $m || ($m = (function(_f){return function(_a){return _createApplyNode()(_ast)(_f)(_a)(_mapFunc);};}))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_make$_node()((function(){var $m; return (function(){return $m || ($m = (_svg$_node()((function(){return ""}))))})})())((function(){return 0}))((function(){return 0}))((function(){return 0}))((function(){return 0}))))})})())))})})())))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_typeof()(_ast)))})})());};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\ast. \\mapFunc. do\n  t = typeof ast\n  eq t 'lit'\n    createLitNode ast (pretty (ast id)) mapFunc\n    eq t 'ref'\n      createRefNode ast (pretty (ast id)) mapFunc\n      eq t 'lambda'\n        ast (\\v b . createLambdaNode ast v b mapFunc)\n        eq t 'apply'\n          ast (\\f a . createApplyNode ast f a mapFunc)\n          make-node (svg-node '') 0 0 0 0");
;
//redStyle = AST([ ([ stroke | black ]) , ([ stroke-width | 2 ]) , ([ fill | #fcc ]) , ([ rx | 8 ]) , ([ ry | 8 ]) ])
root.defs._redStyle = _redStyle = Leisure.define('redStyle', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('redStyle', 60), ctx)
   try {
     return _$r()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "stroke"}))(_$q)((function(){return "black"}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "stroke-width"}))(_$q)((function(){return 2}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "fill"}))(_$q)((function(){return "#fcc"}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "rx"}))(_$q)((function(){return 8}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "ry"}))(_$q)((function(){return 8}))(_$s)))})})())(_$s);
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "[['stroke'|'black'],['stroke-width'|2],['fill'|'#fcc'],['rx'|8],['ry'|8]]");
;
//greenStyle = AST([ ([ stroke | black ]) , ([ stroke-width | 2 ]) , ([ fill | #cfc ]) , ([ rx | 8 ]) , ([ ry | 8 ]) ])
root.defs._greenStyle = _greenStyle = Leisure.define('greenStyle', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('greenStyle', 60), ctx)
   try {
     return _$r()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "stroke"}))(_$q)((function(){return "black"}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "stroke-width"}))(_$q)((function(){return 2}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "fill"}))(_$q)((function(){return "#cfc"}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "rx"}))(_$q)((function(){return 8}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "ry"}))(_$q)((function(){return 8}))(_$s)))})})())(_$s);
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "[['stroke'|'black'],['stroke-width'|2],['fill'|'#cfc'],['rx'|8],['ry'|8]]");
;
//blueStyle = AST([ ([ stroke | black ]) , ([ stroke-width | 2 ]) , ([ fill | #ccf ]) , ([ rx | 8 ]) , ([ ry | 8 ]) ])
root.defs._blueStyle = _blueStyle = Leisure.define('blueStyle', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('blueStyle', 60), ctx)
   try {
     return _$r()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "stroke"}))(_$q)((function(){return "black"}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "stroke-width"}))(_$q)((function(){return 2}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "fill"}))(_$q)((function(){return "#ccf"}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "rx"}))(_$q)((function(){return 8}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "ry"}))(_$q)((function(){return 8}))(_$s)))})})())(_$s);
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 0, "[['stroke'|'black'],['stroke-width'|2],['fill'|'#ccf'],['rx'|8],['ry'|8]]");
;
//createLambdaNode = AST(\ast v b mapFunc . (\rootBox . (\varBox . (\bodyTree . (\childWidth . (\totalWidth . (\pad . (\rootBox . (\varBox . (\bodyTree . make-node (svg-concat ([ (node-line rootBox varBox) , (node-line rootBox bodyTree) , (node-svg varBox) , (node-svg bodyTree) , (node-svg rootBox) ])) totalWidth (+ (+ (node-height rootBox) 5) (max (node-height varBox) (node-height bodyTree))) (/ totalWidth 2) (/ (node-height rootBox) 2)) (node-translate bodyTree (+ pad (+ (node-width varBox) 5)) (+ (node-height rootBox) 5))) (node-translate varBox pad (+ (node-height rootBox) 5))) (node-translate rootBox (- (/ totalWidth 2) (/ (node-width rootBox) 2)) 0)) (max 0 (/ (- totalWidth childWidth) 2))) (max childWidth (node-width rootBox))) (+ (+ (node-width varBox) 5) (node-width bodyTree))) (nodeFor b mapFunc)) (textNode (mapFunc ast greenStyle) v)) (textNode (mapFunc ast greenStyle) lambda))
root.defs._createLambdaNode = _createLambdaNode = Leisure.define('createLambdaNode', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('createLambdaNode', 209), ctx)
   try {
     return function(_ast){return function(_v){return function(_b){return function(_mapFunc){return function(_rootBox){return function(_varBox){return function(_bodyTree){return function(_childWidth){return function(_totalWidth){return function(_pad){return function(_rootBox){return function(_varBox){return function(_bodyTree){return _make$_node()((function(){var $m; return (function(){return $m || ($m = (_svg$_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){var $m; return (function(){return $m || ($m = (_node$_line()(_rootBox)(_varBox)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_node$_line()(_rootBox)(_bodyTree)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_node$_svg()(_varBox)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_node$_svg()(_bodyTree)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_node$_svg()(_rootBox)))})})())(_$s)))})})())))})})())(_totalWidth)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_node$_height()(_rootBox)))})})())((function(){return 5}))))})})())((function(){var $m; return (function(){return $m || ($m = (_max()((function(){var $m; return (function(){return $m || ($m = (_node$_height()(_varBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_node$_height()(_bodyTree)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()(_totalWidth)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_node$_height()(_rootBox)))})})())((function(){return 2}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_node$_translate()(_bodyTree)((function(){var $m; return (function(){return $m || ($m = (_$o()(_pad)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_node$_width()(_varBox)))})})())((function(){return 5}))))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_node$_height()(_rootBox)))})})())((function(){return 5}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_node$_translate()(_varBox)(_pad)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_node$_height()(_rootBox)))})})())((function(){return 5}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_node$_translate()(_rootBox)((function(){var $m; return (function(){return $m || ($m = (_$_()((function(){var $m; return (function(){return $m || ($m = (_$f()(_totalWidth)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_node$_width()(_rootBox)))})})())((function(){return 2}))))})})())))})})())((function(){return 0}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_max()((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_$_()(_totalWidth)(_childWidth)))})})())((function(){return 2}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_max()(_childWidth)((function(){var $m; return (function(){return $m || ($m = (_node$_width()(_rootBox)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_node$_width()(_varBox)))})})())((function(){return 5}))))})})())((function(){var $m; return (function(){return $m || ($m = (_node$_width()(_bodyTree)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeFor()(_b)(_mapFunc)))})})());}((function(){var $m; return (function(){return $m || ($m = (_textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_greenStyle)))})})())(_v)))})})());}((function(){var $m; return (function(){return $m || ($m = (_textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_greenStyle)))})})())((function(){return "lambda"}))))})})());};};};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 4, "\\ast. \\v. \\b. \\mapFunc. do\n  rootBox = textNode (mapFunc ast greenStyle) 'lambda'\n  varBox = textNode (mapFunc ast greenStyle) v\n  bodyTree = nodeFor b mapFunc\n  childWidth = + (+ (node-width varBox) 5) (node-width bodyTree)\n  totalWidth = max childWidth (node-width rootBox)\n  pad = max 0 (/ (- totalWidth childWidth) 2)\n  rootBox = node-translate rootBox (- (/ totalWidth 2) (/ (node-width rootBox) 2)) 0\n  varBox = node-translate varBox pad (+ (node-height rootBox) 5)\n  bodyTree = node-translate bodyTree (+ pad (+ (node-width varBox) 5)) (+ (node-height rootBox) 5)\n  make-node\n    svg-concat [(node-line rootBox varBox), (node-line rootBox bodyTree), (node-svg varBox),(node-svg bodyTree),(node-svg rootBox)]\n    totalWidth\n    + (+ (node-height rootBox) 5) (max (node-height varBox) (node-height bodyTree))\n    / totalWidth 2\n    / (node-height rootBox) 2");
;
//createApplyNode = AST(\ast f a mapFunc . (\rootBox . (\funcTree . (\argTree . (\childWidth . (\totalWidth . (\pad . (\rootBox . (\funcTree . (\argTree . make-node (svg-concat ([ (node-line rootBox funcTree) , (node-line rootBox argTree) , (node-svg rootBox) , (node-svg funcTree) , (node-svg argTree) ])) totalWidth (+ (+ (node-height rootBox) 5) (max (node-height argTree) (node-height funcTree))) (/ totalWidth 2) (/ (node-height rootBox) 2)) (node-translate argTree (+ pad (+ (node-width funcTree) 5)) (+ (node-height rootBox) 5))) (node-translate funcTree pad (+ (node-height rootBox) 5))) (node-translate rootBox (- (/ totalWidth 2) (/ (node-width rootBox) 2)) 0)) (max 0 (/ (- totalWidth childWidth) 2))) (max childWidth (node-width rootBox))) (+ (+ (node-width argTree) 5) (node-width funcTree))) (nodeFor a mapFunc)) (nodeFor f mapFunc)) (textNode (mapFunc ast blueStyle) apply))
root.defs._createApplyNode = _createApplyNode = Leisure.define('createApplyNode', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('createApplyNode', 205), ctx)
   try {
     return function(_ast){return function(_f){return function(_a){return function(_mapFunc){return function(_rootBox){return function(_funcTree){return function(_argTree){return function(_childWidth){return function(_totalWidth){return function(_pad){return function(_rootBox){return function(_funcTree){return function(_argTree){return _make$_node()((function(){var $m; return (function(){return $m || ($m = (_svg$_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){var $m; return (function(){return $m || ($m = (_node$_line()(_rootBox)(_funcTree)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_node$_line()(_rootBox)(_argTree)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_node$_svg()(_rootBox)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_node$_svg()(_funcTree)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_node$_svg()(_argTree)))})})())(_$s)))})})())))})})())(_totalWidth)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_node$_height()(_rootBox)))})})())((function(){return 5}))))})})())((function(){var $m; return (function(){return $m || ($m = (_max()((function(){var $m; return (function(){return $m || ($m = (_node$_height()(_argTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_node$_height()(_funcTree)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()(_totalWidth)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_node$_height()(_rootBox)))})})())((function(){return 2}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_node$_translate()(_argTree)((function(){var $m; return (function(){return $m || ($m = (_$o()(_pad)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_node$_width()(_funcTree)))})})())((function(){return 5}))))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_node$_height()(_rootBox)))})})())((function(){return 5}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_node$_translate()(_funcTree)(_pad)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_node$_height()(_rootBox)))})})())((function(){return 5}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_node$_translate()(_rootBox)((function(){var $m; return (function(){return $m || ($m = (_$_()((function(){var $m; return (function(){return $m || ($m = (_$f()(_totalWidth)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_node$_width()(_rootBox)))})})())((function(){return 2}))))})})())))})})())((function(){return 0}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_max()((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_$_()(_totalWidth)(_childWidth)))})})())((function(){return 2}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_max()(_childWidth)((function(){var $m; return (function(){return $m || ($m = (_node$_width()(_rootBox)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_node$_width()(_argTree)))})})())((function(){return 5}))))})})())((function(){var $m; return (function(){return $m || ($m = (_node$_width()(_funcTree)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeFor()(_a)(_mapFunc)))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeFor()(_f)(_mapFunc)))})})());}((function(){var $m; return (function(){return $m || ($m = (_textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_blueStyle)))})})())((function(){return "apply"}))))})})());};};};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 4, "\\ast. \\f. \\a. \\mapFunc. do\n  rootBox = textNode (mapFunc ast blueStyle) 'apply'\n  funcTree = nodeFor f mapFunc\n  argTree = nodeFor a mapFunc\n  childWidth = + (+ (node-width argTree) 5) (node-width funcTree)\n  totalWidth = max childWidth (node-width rootBox)\n  pad = max 0 (/ (- totalWidth childWidth) 2)\n  rootBox = node-translate rootBox (- (/ totalWidth 2) (/ (node-width rootBox) 2)) 0\n  funcTree = node-translate funcTree pad (+ (node-height rootBox) 5)\n  argTree = node-translate argTree (+ pad (+ (node-width funcTree) 5)) (+ (node-height rootBox) 5)\n  make-node\n    svg-concat [(node-line rootBox funcTree), (node-line rootBox argTree), (node-svg rootBox), (node-svg funcTree), (node-svg argTree)]\n    totalWidth\n    + (+ (node-height rootBox) 5) (max (node-height argTree) (node-height funcTree))\n    / totalWidth 2\n    / (node-height rootBox) 2");
;
//createRefNode = AST(\ast ref mapFunc . textNode (mapFunc ast redStyle) ref)
root.defs._createRefNode = _createRefNode = Leisure.define('createRefNode', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('createRefNode', 11), ctx)
   try {
     return function(_ast){return function(_ref){return function(_mapFunc){return _textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_redStyle)))})})())(_ref);};};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 3, "\\ast. \\ref. \\mapFunc. textNode (mapFunc ast redStyle) ref");
;
//createLitNode = AST(\ast lit mapFunc . textNode (mapFunc ast greenStyle) lit)
root.defs._createLitNode = _createLitNode = Leisure.define('createLitNode', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('createLitNode', 11), ctx)
   try {
     return function(_ast){return function(_lit){return function(_mapFunc){return _textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_greenStyle)))})})())(_lit);};};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 3, "\\ast. \\lit. \\mapFunc. textNode (mapFunc ast greenStyle) lit");
;
//textNode = AST(\map txt . svg-measure-text txt  \w h . (\node-w . (\node-h . make-node (svg-concat ([ (rect ([ ([ x | 2 ]) , ([ y | 2 ]) , ([ width | node-w ]) , ([ height | node-h ]) | map ])) , (text txt ([ ([ text-anchor | middle ]) , ([ dominant-baseline | mathematical ]) , ([ x | (+ 14 (/ w 2)) ]) , ([ y | (+ 5 (/ h 2)) ]) , ([ font-weight | bold ]) ])) ])) node-w node-h (/ node-w 2) (/ node-h 2)) (+ h 14)) (+ w 24))
root.defs._textNode = _textNode = Leisure.define('textNode', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('textNode', 186), ctx)
   try {
     return function(_map){return function(_txt){return _svg$_measure$_text()(_txt)((function(){return ""}))((function(){var $m; return (function(){return $m || ($m = (function(_w){return function(_h){return function(_node$_w){return function(_node$_h){return _make$_node()((function(){var $m; return (function(){return $m || ($m = (_svg$_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){var $m; return (function(){return $m || ($m = (_rect()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "x"}))(_$q)((function(){return 2}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "y"}))(_$q)((function(){return 2}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "width"}))(_$q)(_node$_w)(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "height"}))(_$q)(_node$_h)(_$s)))})})())(_$q)(_map)(_$s)))})})())))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_text()(_txt)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "text-anchor"}))(_$q)((function(){return "middle"}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "dominant-baseline"}))(_$q)((function(){return "mathematical"}))(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "x"}))(_$q)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 14}))((function(){var $m; return (function(){return $m || ($m = (_$f()(_w)((function(){return 2}))))})})())))})})())(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "y"}))(_$q)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 5}))((function(){var $m; return (function(){return $m || ($m = (_$f()(_h)((function(){return 2}))))})})())))})})())(_$s)))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "font-weight"}))(_$q)((function(){return "bold"}))(_$s)))})})())(_$s)))})})())))})})())(_$s)))})})())))})})())(_node$_w)(_node$_h)((function(){var $m; return (function(){return $m || ($m = (_$f()(_node$_w)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()(_node$_h)((function(){return 2}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_$o()(_h)((function(){return 14}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_$o()(_w)((function(){return 24}))))})})());};}))})})());};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\map. \\txt. (svg-measure-text txt '') \\w h . do\n  node-w = + w 24\n  node-h = + h 14\n  make-node\n    (svg-concat [(rect [['x'|2],['y'|2],['width'|node-w],['height'|node-h] | map]), (text txt [['text-anchor'|\"middle\"],['dominant-baseline'|\"mathematical\"],['x'|(+ 14 (/ w 2))],['y'|(+ 5 (/ h 2))], ['font-weight'|'bold']])])\n    node-w\n    node-h\n    / node-w 2\n    / node-h 2");
;
//typeof = AST(\x . getType x id false)
root.defs._typeof = _typeof = Leisure.define('typeof', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('typeof', 7), ctx)
   try {
     return function(_x){return _getType()(_x)(_id)(_false);};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\x. getType x id false");
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)