var std = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  std = root = {};
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
var _id, _flip, _true, _false, _and, _or, _not, _neq, _left, _right, _some, _some2, _none, _cons, _nil, _null$e, _append, _compose, _iszero, _positive, _length, _$_$_, _$o$o, _even$e, _odd$e, _max, _min, _head, _tail, _reverse, _subreverse, _addstr, _if, _at, _take, _takeWhile, _drop, _dropWhile, _series, _from, _fromBy, _fromTo, _fromToBy, _any, _all, _index_combine, _indexof, _position, _find, _find$_if, _find$_if$_opt, _count, _count$_if, _count$_if$_not, _remove, _remove$_if, _remove$_if$_not, _map, _reduce, _foldr, _foldr1, _foldl, _foldl1, _$r, _$b, _$s, _$q, _dl, _dlAppend, _dlList, _identMacro, _do, _m_subdo, _let, _m_sublet, _m_extractVar, _m_varFromTuple, _html;
//id = AST(\x . x)
root.defs._id = _id = Leisure.define('id', (function(_x){return _x();}), 1, "\\x. x");
;
//flip = AST(\f a b . f b a)
root.defs._flip = _flip = Leisure.define('flip', (Leisure.setDataType(function(_f){return Leisure.setType(function(_a){return function(_b){return _f()(_b)(_a);};}, 'flip');}, 'flip')), 1, "\\f. \\a b . f b a");
;
//true = AST(\a b . a)
root.defs._true = _true = Leisure.define('true', (Leisure.setType(function(_a){return function(_b){return _a();};}, 'true')), 0, "\\a b . a");
;
//false = AST(\a b . b)
root.defs._false = _false = Leisure.define('false', (Leisure.setType(function(_a){return function(_b){return _b();};}, 'false')), 0, "\\a b . b");
;
//and = AST(\a b . a b false)
root.defs._and = _and = Leisure.define('and', (function(_a){return function(_b){return _a()(_b)(_false);};}), 2, "\\a. \\b. a b false");
;
//or = AST(\a . a true)
root.defs._or = _or = Leisure.define('or', (function(_a){return _a()(_true);}), 1, "\\a. a true");
;
//not = AST(\a . a false true)
root.defs._not = _not = Leisure.define('not', (function(_a){return _a()(_false)(_true);}), 1, "\\a. a false true");
;
//neq = AST(\a b . not (eq a b))
root.defs._neq = _neq = Leisure.define('neq', (function(_a){return function(_b){return _not()((function(){var $m; return (function(){return $m || ($m = (_eq()(_a)(_b)))})})());};}), 2, "\\a. \\b. not (eq a b)");
;
//left = AST(\v l r . l v)
root.defs._left = _left = Leisure.define('left', (Leisure.setDataType(function(_v){return Leisure.setType(function(_l){return function(_r){return _l()(_v);};}, 'left');}, 'left')), 1, "\\v. \\l r . l v");
;
//right = AST(\v l r . r v)
root.defs._right = _right = Leisure.define('right', (Leisure.setDataType(function(_v){return Leisure.setType(function(_l){return function(_r){return _r()(_v);};}, 'right');}, 'right')), 1, "\\v. \\l r . r v");
;
//some = AST(\x yes no . yes x)
root.defs._some = _some = Leisure.define('some', (Leisure.setDataType(function(_x){return Leisure.setType(function(_yes){return function(_no){return _yes()(_x);};}, 'some');}, 'some')), 1, "\\x. \\yes no . yes x");
;
//some2 = AST(\a b yes no . yes a b)
root.defs._some2 = _some2 = Leisure.define('some2', (Leisure.setDataType(function(_a){return function(_b){return Leisure.setType(function(_yes){return function(_no){return _yes()(_a)(_b);};}, 'some2');};}, 'some2')), 2, "\\a. \\b. \\yes no . yes a b");
;
//none = AST(\yes no . no)
root.defs._none = _none = Leisure.define('none', (Leisure.setType(function(_yes){return function(_no){return _no();};}, 'none')), 0, "\\yes no . no");
;
//cons = AST(\a b f . f a b)
root.defs._cons = _cons = Leisure.define('cons', (Leisure.setDataType(function(_a){return function(_b){return Leisure.setType(function(_f){return _f()(_a)(_b);}, 'cons');};}, 'cons')), 2, "\\a. \\b.\n  \\f . f\n    a\n    b");
;
//nil = AST(\a b . b)
root.defs._nil = _nil = Leisure.define('nil', (Leisure.setType(function(_a){return function(_b){return _b();};}, 'nil')), 0, "\\a b . b");
;
//null? = AST(eq nil)
root.defs._null$e = _null$e = Leisure.define('null?', (_eq()(_nil)), 0, "eq nil");
;
//append = AST(\l1 l2 . l1 \h t D . cons h (append t l2) l2)
root.defs._append = _append = Leisure.define('append', (function(_l1){return function(_l2){return _l1()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _cons()(_h)((function(){var $m; return (function(){return $m || ($m = (_append()(_t)(_l2)))})})());};};}))})})())(_l2);};}), 2, "\\l1. \\l2. l1 (\\h t D . cons h (append t l2)) l2");
;
//compose = AST(\f g x . f (g x))
root.defs._compose = _compose = Leisure.define('compose', (Leisure.setDataType(function(_f){return function(_g){return Leisure.setType(function(_x){return _f()((function(){var $m; return (function(){return $m || ($m = (_g()(_x)))})})());}, 'compose');};}, 'compose')), 2, "\\f. \\g. \\x . f ( g x)");
;
//iszero = AST(eq 0)
root.defs._iszero = _iszero = Leisure.define('iszero', (_eq()((function(){return 0}))), 0, "eq 0");
;
//positive = AST(< 0)
root.defs._positive = _positive = Leisure.define('positive', (_$y()((function(){return 0}))), 0, "< 0");
;
//length = AST(\l . eq l nil 0 (++ (length (tail l))))
root.defs._length = _length = Leisure.define('length', (function(_l){return _eq()(_l)(_nil)((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_$o$o()((function(){var $m; return (function(){return $m || ($m = (_length()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})());}), 1, "\\l. (eq l nil) 0 (++ (length (tail l) ) )");
;
//-- = AST(flip - 1)
root.defs._$_$_ = _$_$_ = Leisure.define('--', (_flip()(_$_)((function(){return 1}))), 0, "(flip -) 1");
;
//++ = AST(+ 1)
root.defs._$o$o = _$o$o = Leisure.define('++', (_$o()((function(){return 1}))), 0, "+ 1");
;
//even? = AST(\x . iszero (% x 2))
root.defs._even$e = _even$e = Leisure.define('even?', (function(_x){return _iszero()((function(){var $m; return (function(){return $m || ($m = (_$A()(_x)((function(){return 2}))))})})());}), 1, "\\x. iszero (% x 2)");
;
//odd? = AST(\x . eq 1 (% x 2))
root.defs._odd$e = _odd$e = Leisure.define('odd?', (function(_x){return _eq()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_$A()(_x)((function(){return 2}))))})})());}), 1, "\\x. eq 1 (% x 2)");
;
//max = AST(\a b . gt a b a b)
root.defs._max = _max = Leisure.define('max', (function(_a){return function(_b){return _gt()(_a)(_b)(_a)(_b);};}), 2, "\\a. \\b. (gt a b) a b");
;
//min = AST(\a b . lt a b a b)
root.defs._min = _min = Leisure.define('min', (function(_a){return function(_b){return _lt()(_a)(_b)(_a)(_b);};}), 2, "\\a. \\b. (lt a b) a b");
;
//head = AST(\l . l \h t . h)
root.defs._head = _head = Leisure.define('head', (function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return _h();};}))})})());}), 1, "\\l. l \\h t . h");
;
//tail = AST(\l . l \h t . t)
root.defs._tail = _tail = Leisure.define('tail', (function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return _t();};}))})})());}), 1, "\\l. l \\h t . t");
;
//reverse = AST(\l . subreverse l nil)
root.defs._reverse = _reverse = Leisure.define('reverse', (function(_l){return _subreverse()(_l)(_nil);}), 1, "\\l. subreverse l nil");
;
//subreverse = AST(\l result . l \h t D . subreverse t (cons h result) result)
root.defs._subreverse = _subreverse = Leisure.define('subreverse', (function(_l){return function(_result){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _subreverse()(_t)((function(){var $m; return (function(){return $m || ($m = (_cons()(_h)(_result)))})})());};};}))})})())(_result);};}), 2, "\\l. \\result. l (\\h t D . subreverse t (cons h result)) result");
;
//addstr = AST(\a b . concat ([ a , b ]))
root.defs._addstr = _addstr = Leisure.define('addstr', (function(_a){return function(_b){return _concat()((function(){var $m; return (function(){return $m || ($m = (_$r()(_a)(_$b)(_b)(_$s)))})})());};}), 2, "\\a. \\b. concat [a, b]");
;
//if = AST(id)
root.defs._if = _if = Leisure.define('if', (_id()), 0, "id");
;
//at = AST(\l x . iszero x (head l) (at (tail l) (-- x)))
root.defs._at = _at = Leisure.define('at', (function(_l){return function(_x){return _iszero()(_x)((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_at()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_$_$_()(_x)))})})())))})})());};}), 2, "\\l. \\x. (iszero (x)) (head l) (at (tail l) (-- (x) ) )");
;
//take = AST(\n list . positive n (list \h t D . cons h (take (-- n) t) nil) nil)
root.defs._take = _take = Leisure.define('take', (function(_n){return function(_list){return _positive()(_n)((function(){var $m; return (function(){return $m || ($m = (_list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _cons()(_h)((function(){var $m; return (function(){return $m || ($m = (_take()((function(){var $m; return (function(){return $m || ($m = (_$_$_()(_n)))})})())(_t)))})})());};};}))})})())(_nil)))})})())(_nil);};}), 2, "\\n. \\list. positive n\n  list\n    \\h t D . cons h (take (-- n) t)\n    nil\n  nil");
;
//takeWhile = AST(\predicate list . list \h t D . predicate h (cons h (takeWhile predicate t)) nil nil)
root.defs._takeWhile = _takeWhile = Leisure.define('takeWhile', (function(_predicate){return function(_list){return _list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _predicate()(_h)((function(){var $m; return (function(){return $m || ($m = (_cons()(_h)((function(){var $m; return (function(){return $m || ($m = (_takeWhile()(_predicate)(_t)))})})())))})})())(_nil);};};}))})})())(_nil);};}), 2, "\\predicate. \\list. list\n  \\h t D . predicate h\n    cons h (takeWhile predicate t)\n    nil\n  nil");
;
//drop = AST(\x list . positive x (list \h t D . drop (-- x) t nil) list)
root.defs._drop = _drop = Leisure.define('drop', (function(_x){return function(_list){return _positive()(_x)((function(){var $m; return (function(){return $m || ($m = (_list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _drop()((function(){var $m; return (function(){return $m || ($m = (_$_$_()(_x)))})})())(_t);};};}))})})())(_nil)))})})())(_list);};}), 2, "\\x. \\list. positive x\n  list\n    \\h t D . drop (-- x) t\n    nil\n  list");
;
//dropWhile = AST(\predicate list . list \h t D . predicate h (dropWhile predicate t) list nil)
root.defs._dropWhile = _dropWhile = Leisure.define('dropWhile', (function(_predicate){return function(_list){return _list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _predicate()(_h)((function(){var $m; return (function(){return $m || ($m = (_dropWhile()(_predicate)(_t)))})})())(_list);};};}))})})())(_nil);};}), 2, "\\predicate. \\list. list\n  \\h t D . predicate h\n    dropWhile predicate t\n    list\n  nil");
;
//series = AST(\func n . cons n (series func (func n)))
root.defs._series = _series = Leisure.define('series', (function(_func){return function(_n){return _cons()(_n)((function(){var $m; return (function(){return $m || ($m = (_series()(_func)((function(){var $m; return (function(){return $m || ($m = (_func()(_n)))})})())))})})());};}), 2, "\\func. \\n. cons n (series func (func n))");
;
//from = AST(\n . series ++ n)
root.defs._from = _from = Leisure.define('from', (function(_n){return _series()(_$o$o)(_n);}), 1, "\\n. series ++ n");
;
//fromBy = AST(\n inc . series (+ inc) n)
root.defs._fromBy = _fromBy = Leisure.define('fromBy', (function(_n){return function(_inc){return _series()((function(){var $m; return (function(){return $m || ($m = (_$o()(_inc)))})})())(_n);};}), 2, "\\n. \\inc. series (+ inc) n");
;
//fromTo = AST(\n m . takeWhile (> m) (from n))
root.defs._fromTo = _fromTo = Leisure.define('fromTo', (function(_n){return function(_m){return _takeWhile()((function(){var $m; return (function(){return $m || ($m = (_$z()(_m)))})})())((function(){var $m; return (function(){return $m || ($m = (_from()(_n)))})})());};}), 2, "\\n. \\m. takeWhile (> m) (from n)");
;
//fromToBy = AST(\n m inc . takeWhile (> m) (fromBy n inc))
root.defs._fromToBy = _fromToBy = Leisure.define('fromToBy', (function(_n){return function(_m){return function(_inc){return _takeWhile()((function(){var $m; return (function(){return $m || ($m = (_$z()(_m)))})})())((function(){var $m; return (function(){return $m || ($m = (_fromBy()(_n)(_inc)))})})());};};}), 3, "\\n. \\m. \\inc. takeWhile (> m) (fromBy n inc)");
;
//any = AST(\f l . l \h t D . or (f h) (any f t) false)
root.defs._any = _any = Leisure.define('any', (function(_f){return function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _or()((function(){var $m; return (function(){return $m || ($m = (_f()(_h)))})})())((function(){var $m; return (function(){return $m || ($m = (_any()(_f)(_t)))})})());};};}))})})())(_false);};}), 2, "\\f. \\l. l\n  \\h t D . or\n    f h\n    any f t\n  false");
;
//all = AST(\f l . l \h t D . and (f h) (all f t) true)
root.defs._all = _all = Leisure.define('all', (function(_f){return function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _and()((function(){var $m; return (function(){return $m || ($m = (_f()(_h)))})})())((function(){var $m; return (function(){return $m || ($m = (_all()(_f)(_t)))})})());};};}))})})())(_true);};}), 2, "\\f. \\l. l\n  \\h t D . and\n    f h\n    all f t\n  true");
;
//index_combine = AST(\x y . or (eq x nil) (eq y nil) nil (+ x y))
root.defs._index_combine = _index_combine = Leisure.define('index_combine', (function(_x){return function(_y){return _or()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_y)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_$o()(_x)(_y)))})})());};}), 2, "\\x. \\y. (or (eq x nil) (eq y nil)) (nil) (+ x y)");
;
//indexof = AST(\l x . if (eq l nil) nil (if (eq x (head l)) 0 (index_combine 1 (indexof (tail l) x))))
root.defs._indexof = _indexof = Leisure.define('indexof', (function(_l){return function(_x){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_l)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())))})})())((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_index_combine()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_indexof()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())(_x)))})})())))})})())))})})());};}), 2, "\\l. \\x. if (eq l nil) (nil) (if (eq x (head l)) (0) (index_combine 1 (indexof (tail l) x ) ) )");
;
//position = AST(\l x . indexof x l)
root.defs._position = _position = Leisure.define('position', (function(_l){return function(_x){return _indexof()(_x)(_l);};}), 2, "\\l. \\x. indexof x l");
;
//find = AST(\x l . find-if (eq x) l)
root.defs._find = _find = Leisure.define('find', (function(_x){return function(_l){return _find$_if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)))})})())(_l);};}), 2, "\\x. \\l. find-if (eq x) l");
;
//find-if = AST(\f l . l \h t D . f h h (find-if f t) nil)
root.defs._find$_if = _find$_if = Leisure.define('find-if', (function(_f){return function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _f()(_h)(_h)((function(){var $m; return (function(){return $m || ($m = (_find$_if()(_f)(_t)))})})());};};}))})})())(_nil);};}), 2, "\\f. \\l. l (\\h t D . (f h) h (find-if f t)) nil");
;
//find-if-opt = AST(\f l . l \h t D . f h (some h) (find-if-opt f t) none)
root.defs._find$_if$_opt = _find$_if$_opt = Leisure.define('find-if-opt', (function(_f){return function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _f()(_h)((function(){var $m; return (function(){return $m || ($m = (_some()(_h)))})})())((function(){var $m; return (function(){return $m || ($m = (_find$_if$_opt()(_f)(_t)))})})());};};}))})})())(_none);};}), 2, "\\f. \\l. l (\\h t D . (f h) (some h) (find-if-opt f t)) none");
;
//count = AST(\x l . count-if (eq x) l)
root.defs._count = _count = Leisure.define('count', (function(_x){return function(_l){return _count$_if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)))})})())(_l);};}), 2, "\\x. \\l. count-if (eq x) l");
;
//count-if = AST(\f l . if (eq l nil) 0 (+ (f (head l) 1 0) (count-if f (tail l))))
root.defs._count$_if = _count$_if = Leisure.define('count-if', (function(_f){return function(_l){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_l)(_nil)))})})())((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_f()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){return 1}))((function(){return 0}))))})})())((function(){var $m; return (function(){return $m || ($m = (_count$_if()(_f)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})());};}), 2, "\\f. \\l. if (eq l nil) 0\n  + (f (head l) 1 0) (count-if f (tail l))");
;
//count-if-not = AST(\f l . count-if \x . not (f x) l)
root.defs._count$_if$_not = _count$_if$_not = Leisure.define('count-if-not', (function(_f){return function(_l){return _count$_if()((function(){var $m; return (function(){return $m || ($m = (function(_x){return _not()((function(){var $m; return (function(){return $m || ($m = (_f()(_x)))})})());}))})})())(_l);};}), 2, "\\f. \\l. count-if (\\x. not (f x)) l");
;
//remove = AST(\x l . remove-if (eq x) l)
root.defs._remove = _remove = Leisure.define('remove', (function(_x){return function(_l){return _remove$_if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)))})})())(_l);};}), 2, "\\x. \\l. remove-if (eq x) l");
;
//remove-if = AST(\f l . if (eq l nil) nil (if (f (head l)) (remove-if f (tail l)) (cons (head l) (remove-if f (tail l)))))
root.defs._remove$_if = _remove$_if = Leisure.define('remove-if', (function(_f){return function(_l){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_l)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_f()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_remove$_if()(_f)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_remove$_if()(_f)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})())))})})());};}), 2, "\\f. \\l. if (eq l nil) nil\n  if (f (head l)) (remove-if f (tail l))\n    cons (head l) (remove-if f (tail l))");
;
//remove-if-not = AST(\f l . remove-if \x . not (f x) l)
root.defs._remove$_if$_not = _remove$_if$_not = Leisure.define('remove-if-not', (function(_f){return function(_l){return _remove$_if()((function(){var $m; return (function(){return $m || ($m = (function(_x){return _not()((function(){var $m; return (function(){return $m || ($m = (_f()(_x)))})})());}))})})())(_l);};}), 2, "\\f. \\l. remove-if (\\x. not (f x)) l");
;
//map = AST(\func list . list \h t D . cons (func h) (map func t) nil)
root.defs._map = _map = Leisure.define('map', (function(_func){return function(_list){return _list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _cons()((function(){var $m; return (function(){return $m || ($m = (_func()(_h)))})})())((function(){var $m; return (function(){return $m || ($m = (_map()(_func)(_t)))})})());};};}))})})())(_nil);};}), 2, "\\func. \\list. list (\\h t D . cons (func h) (map func t)) nil");
;
//reduce = AST(\func list . if (eq list nil) nil (if (eq 1 (length list)) (head list) (func (head list) (reduce func (tail list)))))
root.defs._reduce = _reduce = Leisure.define('reduce', (function(_func){return function(_list){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_list)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_length()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_func()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_reduce()(_func)((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})())))})})());};}), 2, "\\func. \\list. if (eq list nil) nil\n  if (eq 1 (length list)) (head list)\n    func (head list) (reduce func (tail list))");
;
//foldr = AST(\func value list . list \h t D . func h (foldr func value t) value)
root.defs._foldr = _foldr = Leisure.define('foldr', (function(_func){return function(_value){return function(_list){return _list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _func()(_h)((function(){var $m; return (function(){return $m || ($m = (_foldr()(_func)(_value)(_t)))})})());};};}))})})())(_value);};};}), 3, "\\func. \\value. \\list. list (\\h t D . func h (foldr func value t)) value");
;
//foldr1 = AST(\func list . list \h t D . null? t h (func h (foldr1 func t)) nil)
root.defs._foldr1 = _foldr1 = Leisure.define('foldr1', (function(_func){return function(_list){return _list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _null$e()(_t)(_h)((function(){var $m; return (function(){return $m || ($m = (_func()(_h)((function(){var $m; return (function(){return $m || ($m = (_foldr1()(_func)(_t)))})})())))})})());};};}))})})())(_nil);};}), 2, "\\func. \\list. list\n  \\h t D . null? t\n     h\n     func h (foldr1 func t)\n  nil");
;
//foldl = AST(\func value list . list \h t D . foldl func (func value h) t value)
root.defs._foldl = _foldl = Leisure.define('foldl', (function(_func){return function(_value){return function(_list){return _list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _foldl()(_func)((function(){var $m; return (function(){return $m || ($m = (_func()(_value)(_h)))})})())(_t);};};}))})})())(_value);};};}), 3, "\\func. \\value. \\list. list (\\h t D . foldl func (func value h) t) value");
;
//foldl1 = AST(\func list . list \h t D . foldl func h t nil)
root.defs._foldl1 = _foldl1 = Leisure.define('foldl1', (function(_func){return function(_list){return _list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _foldl()(_func)(_h)(_t);};};}))})})())(_nil);};}), 2, "\\func. \\list. list (\\h t D. foldl func h t) nil");
;
//[ = AST(\item c . c \rest . cons item rest)
root.defs._$r = _$r = Leisure.define('[', (Leisure.setType(function(_item){return function(_c){return _c()((function(){var $m; return (function(){return $m || ($m = (function(_rest){return _cons()(_item)(_rest);}))})})());};}, '[')), 0, "\\item c . c \\rest . cons item rest");
root.tokenDefs.push('[', '=(]=');
;
//, = AST(\f item c . c \rest . f (cons item rest))
root.defs._$b = _$b = Leisure.define(',', (Leisure.setType(function(_f){return function(_item){return function(_c){return _c()((function(){var $m; return (function(){return $m || ($m = (function(_rest){return _f()((function(){var $m; return (function(){return $m || ($m = (_cons()(_item)(_rest)))})})());}))})})());};};}, ',')), 0, "\\f item c . c \\rest . f (cons item rest)");
root.tokenDefs.push(',', '=.=');
;
//] = AST(\f . f nil)
root.defs._$s = _$s = Leisure.define(']', (Leisure.setType(function(_f){return _f()(_nil);}, ']')), 0, "\\f . f nil");
root.tokenDefs.push(']', '=)=');
;
//| = AST(\f rest g . f rest)
root.defs._$q = _$q = Leisure.define('|', (Leisure.setType(function(_f){return function(_rest){return function(_g){return _f()(_rest);};};}, '|')), 0, "\\f rest g . f rest");
root.tokenDefs.push('|', '=.=');
;
//dl = AST(\list . append list)
root.defs._dl = _dl = Leisure.define('dl', (function(_list){return _append()(_list);}), 1, "\\list. append list");
;
//dlAppend = AST(\da db list . da (db list))
root.defs._dlAppend = _dlAppend = Leisure.define('dlAppend', (function(_da){return function(_db){return function(_list){return _da()((function(){var $m; return (function(){return $m || ($m = (_db()(_list)))})})());};};}), 3, "\\da. \\db. \\list. da (db list)");
;
//dlList = AST(\dl . dl nil)
root.defs._dlList = _dlList = Leisure.define('dlList', (function(_dl){return _dl()(_nil);}), 1, "\\dl. dl nil");
;
//identMacro = AST(\apl . apl \f a . is f ref a (apply (identMacro f) a))
root.defs._identMacro = _identMacro = Leisure.defineMacro('identMacro', (function(_apl){return _apl()((function(){var $m; return (function(){return $m || ($m = (function(_f){return function(_a){return _is()(_f)(_ref)(_a)((function(){var $m; return (function(){return $m || ($m = (_apply()((function(){var $m; return (function(){return $m || ($m = (_identMacro()(_f)))})})())(_a)))})})());};}))})})());}), 1, "\\apl. apl \\f a . (is f ref) a (apply (identMacro f) a)");
root.tokenDefs.push('identMacro', '=M=');
;
//do = AST(\apl . apl \f a . m_subdo a f)
root.defs._do = _do = Leisure.defineMacro('do', (function(_apl){return _apl()((function(){var $m; return (function(){return $m || ($m = (function(_f){return function(_a){return _m_subdo()(_a)(_f);};}))})})());}), 1, "\\apl. apl \\f a . m_subdo a f");
root.tokenDefs.push('do', '=M=');
;
//m_subdo = AST(\a f . or (is f ref) (is f lit) a (f \f2 a2 . m_subdo (m_extractVar a2 <- \v ast . apply (apply (ref bind) ast) (lambda v a) (m_extractVar a2 = \v ast . apply (lambda v a) ast (apply (apply (ref bind) a2) (lambda _ a)))) f2))
root.defs._m_subdo = _m_subdo = Leisure.define('m_subdo', (function(_a){return function(_f){return _or()((function(){var $m; return (function(){return $m || ($m = (_is()(_f)(_ref)))})})())((function(){var $m; return (function(){return $m || ($m = (_is()(_f)(_lit)))})})())(_a)((function(){var $m; return (function(){return $m || ($m = (_f()((function(){var $m; return (function(){return $m || ($m = (function(_f2){return function(_a2){return _m_subdo()((function(){var $m; return (function(){return $m || ($m = (_m_extractVar()(_a2)((function(){return "<-"}))((function(){var $m; return (function(){return $m || ($m = (function(_v){return function(_ast){return _apply()((function(){var $m; return (function(){return $m || ($m = (_apply()((function(){var $m; return (function(){return $m || ($m = (_ref()((function(){return "bind"}))))})})())(_ast)))})})())((function(){var $m; return (function(){return $m || ($m = (_lambda()(_v)(_a)))})})());};}))})})())((function(){var $m; return (function(){return $m || ($m = (_m_extractVar()(_a2)((function(){return "="}))((function(){var $m; return (function(){return $m || ($m = (function(_v){return function(_ast){return _apply()((function(){var $m; return (function(){return $m || ($m = (_lambda()(_v)(_a)))})})())(_ast);};}))})})())((function(){var $m; return (function(){return $m || ($m = (_apply()((function(){var $m; return (function(){return $m || ($m = (_apply()((function(){var $m; return (function(){return $m || ($m = (_ref()((function(){return "bind"}))))})})())(_a2)))})})())((function(){var $m; return (function(){return $m || ($m = (_lambda()((function(){return "_"}))(_a)))})})())))})})())))})})())))})})())(_f2);};}))})})())))})})());};}), 2, "\\a. \\f. or (is f ref) (is f lit)\n  a\n  f \\f2 a2 . m_subdo\n    m_extractVar a2 '<-'\n      \\v ast . apply (apply (ref 'bind') ast) (lambda v a)\n      m_extractVar a2 '='\n        \\v ast . apply (lambda v a) ast\n        apply (apply (ref 'bind') a2) (lambda '_' a)\n    f2");
;
//let = AST(\apl . apl \f a . m_sublet f a)
root.defs._let = _let = Leisure.defineMacro('let', (function(_apl){return _apl()((function(){var $m; return (function(){return $m || ($m = (function(_f){return function(_a){return _m_sublet()(_f)(_a);};}))})})());}), 1, "\\apl. apl \\f a . m_sublet f a");
root.tokenDefs.push('let', '=M=');
;
//m_sublet = AST(\f a . or (is f ref) (is f lit) a (f \f2 a2 . m_extractVar a2 = \v ast . m_sublet f2 (apply (lambda v a) ast) (apply a a2)))
root.defs._m_sublet = _m_sublet = Leisure.define('m_sublet', (function(_f){return function(_a){return _or()((function(){var $m; return (function(){return $m || ($m = (_is()(_f)(_ref)))})})())((function(){var $m; return (function(){return $m || ($m = (_is()(_f)(_lit)))})})())(_a)((function(){var $m; return (function(){return $m || ($m = (_f()((function(){var $m; return (function(){return $m || ($m = (function(_f2){return function(_a2){return _m_extractVar()(_a2)((function(){return "="}))((function(){var $m; return (function(){return $m || ($m = (function(_v){return function(_ast){return _m_sublet()(_f2)((function(){var $m; return (function(){return $m || ($m = (_apply()((function(){var $m; return (function(){return $m || ($m = (_lambda()(_v)(_a)))})})())(_ast)))})})());};}))})})())((function(){var $m; return (function(){return $m || ($m = (_apply()(_a)(_a2)))})})());};}))})})())))})})());};}), 2, "\\f. \\a. or (is f ref) (is f lit)\n  a\n  f \\f2 a2 . m_extractVar a2 '='\n    \\v ast . m_sublet f2 (apply (lambda v a) ast)\n    apply a a2");
;
//m_extractVar = AST(\ast token . is ast apply (ast \f a . m_varFromTuple f token \v . some2 v a (m_extractVar f token \var ast . some2 var (apply ast a) none)) none)
root.defs._m_extractVar = _m_extractVar = Leisure.define('m_extractVar', (function(_ast){return function(_token){return _is()(_ast)(_apply)((function(){var $m; return (function(){return $m || ($m = (_ast()((function(){var $m; return (function(){return $m || ($m = (function(_f){return function(_a){return _m_varFromTuple()(_f)(_token)((function(){var $m; return (function(){return $m || ($m = (function(_v){return _some2()(_v)(_a);}))})})())((function(){var $m; return (function(){return $m || ($m = (_m_extractVar()(_f)(_token)((function(){var $m; return (function(){return $m || ($m = (function(_var){return function(_ast){return _some2()(_var)((function(){var $m; return (function(){return $m || ($m = (_apply()(_ast)(_a)))})})());};}))})})())(_none)))})})());};}))})})())))})})())(_none);};}), 2, "\\ast. \\token. is ast apply\n  ast \\f a .m_varFromTuple f token\n    \\v . some2 v a\n    m_extractVar f token\n      \\var ast . some2 var (apply ast a)\n      none\n  none");
;
//m_varFromTuple = AST(\ast token . is ast apply (ast \f arg . or (is f ref) (is f lit) (or (is arg ref) (is arg lit) (arg \arrow . eq arrow token (f \v . some v) none) none) none) none)
root.defs._m_varFromTuple = _m_varFromTuple = Leisure.define('m_varFromTuple', (function(_ast){return function(_token){return _is()(_ast)(_apply)((function(){var $m; return (function(){return $m || ($m = (_ast()((function(){var $m; return (function(){return $m || ($m = (function(_f){return function(_arg){return _or()((function(){var $m; return (function(){return $m || ($m = (_is()(_f)(_ref)))})})())((function(){var $m; return (function(){return $m || ($m = (_is()(_f)(_lit)))})})())((function(){var $m; return (function(){return $m || ($m = (_or()((function(){var $m; return (function(){return $m || ($m = (_is()(_arg)(_ref)))})})())((function(){var $m; return (function(){return $m || ($m = (_is()(_arg)(_lit)))})})())((function(){var $m; return (function(){return $m || ($m = (_arg()((function(){var $m; return (function(){return $m || ($m = (function(_arrow){return _eq()(_arrow)(_token)((function(){var $m; return (function(){return $m || ($m = (_f()((function(){var $m; return (function(){return $m || ($m = (function(_v){return _some()(_v);}))})})())))})})())(_none);}))})})())))})})())(_none)))})})())(_none);};}))})})())))})})())(_none);};}), 2, "\\ast. \\token. is ast apply\n  ast \\f arg . or (is f ref) (is f lit)\n    or (is arg ref) (is arg lit)\n      arg \\arrow . eq arrow token\n        f \\v . some v\n        none\n      none\n    none\n  none");
;
//html = AST(\x f . f x)
root.defs._html = _html = Leisure.define('html', (Leisure.setDataType(function(_x){return Leisure.setType(function(_f){return _f()(_x);}, 'html');}, 'html')), 1, "\\x. \\f . f x");
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)