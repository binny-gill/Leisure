define([], function(){
  return L_runMonads([
    function(){return resolve(L_newDefine)("makeNode", 5, "makeNode svg width height rootX rootY = \\f . f svg width height rootX rootY", lazy(setDataType((function(){
  var L_$_F = function(L_svg, L_width, L_height, L_rootX, L_rootY) {
    return L_checkPartial(L_$_F, arguments) || setType(function(L_f){return resolve(L_f)(L_svg)(L_width)(L_height)(L_rootX)(L_rootY)}, 'makeNode');
  };
  return L_$_F;
})(), 'makeNode')))},
    function(){return resolve(L_newDefine)("nodeSvg", 1, "nodeSvg st = st \\svg width height rootX rootY . svg", lazy(function(L_st){return resolve(L_st)(lazy(function(L_svg){return function(L_width){return function(L_height){return function(L_rootX){return function(L_rootY){return resolve(L_svg)}}}}}))}))},
    function(){return resolve(L_newDefine)("nodeWidth", 1, "nodeWidth st = st \\svg width height rootX rootY . width", lazy(function(L_st){return resolve(L_st)(lazy(function(L_svg){return function(L_width){return function(L_height){return function(L_rootX){return function(L_rootY){return resolve(L_width)}}}}}))}))},
    function(){return resolve(L_newDefine)("nodeHeight", 1, "nodeHeight st = st \\svg width height rootX rootY . height", lazy(function(L_st){return resolve(L_st)(lazy(function(L_svg){return function(L_width){return function(L_height){return function(L_rootX){return function(L_rootY){return resolve(L_height)}}}}}))}))},
    function(){return resolve(L_newDefine)("nodeRootX", 1, "nodeRootX st = st \\svg width height rootX rootY . rootX", lazy(function(L_st){return resolve(L_st)(lazy(function(L_svg){return function(L_width){return function(L_height){return function(L_rootX){return function(L_rootY){return resolve(L_rootX)}}}}}))}))},
    function(){return resolve(L_newDefine)("nodeRootY", 1, "nodeRootY st = st \\svg width height rootX rootY . rootY", lazy(function(L_st){return resolve(L_st)(lazy(function(L_svg){return function(L_width){return function(L_height){return function(L_rootX){return function(L_rootY){return resolve(L_rootY)}}}}}))}))},
    function(){return resolve(L_newDefine)("space", 0, "space = 10", 10)},
    function(){return resolve(L_newDefine)("border", 0, "border = 5", 5)},
    function(){return resolve(L_newDefine)("nodeTranslate", 3, "nodeTranslate st x y = st \\svg width height rootX rootY . makeNode\r\n  translate svg x y\r\n  width\r\n  height\r\n  rootX + x\r\n  rootY + y", lazy((function(){
  var L_$_F = function(L_st, L_x, L_y) {
    return L_checkPartial(L_$_F, arguments) || resolve(L_st)(lazy(function(L_svg){return function(L_width){return function(L_height){return function(L_rootX){return function(L_rootY){return resolve(L_makeNode)(function(){"use strict";return resolve(L_translate)(L_svg, L_x, L_y);}, L_width, L_height, function(){"use strict";return resolve(L_$o)(L_rootX, L_x);}, function(){"use strict";return resolve(L_$o)(L_rootY, L_y);})}}}}}));
  };
  return L_$_F;
})()))},
    function(){return resolve(L_newDefine)("nodeLine", 2, "nodeLine n1 n2 = n1 \\s1 w1 h1 x1 y1 . n2 \\s2 w2 h2 x2 y2 .\r\n  line [['x1'|x1] ['y1'|y1] ['x2'|x2] ['y2'|y2] ['stroke-width'|3] | defaultLineMap]", lazy((function(){
  var L_$_F = function(L_n1, L_n2) {
    return L_checkPartial(L_$_F, arguments) || resolve(L_n1)(lazy(function(L_s1){return function(L_w1){return function(L_h1){return function(L_x1){return function(L_y1){return resolve(L_n2)(lazy(function(L_s2){return function(L_w2){return function(L_h2){return function(L_x2){return function(L_y2){return resolve(L_line)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("x1", L_x1);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("y1", L_y1);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("x2", L_x2);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("y2", L_y2);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("stroke-width", 3);}, L_defaultLineMap);});});});});})}}}}}))}}}}}));
  };
  return L_$_F;
})()))},
    function(){return resolve(L_newDefine)("rangeContainsRange", 4, "rangeContainsRange start end innerStart innerEnd = and (lte start innerStart) (lte innerEnd end)", lazy((function(){
  var L_$_F = function(L_start, L_end, L_innerStart, L_innerEnd) {
    return L_checkPartial(L_$_F, arguments) || resolve(L_and)(function(){"use strict";return L$(resolve(L_lte))(L_start, L_innerStart);}, function(){"use strict";return L$(resolve(L_lte))(L_innerEnd, L_end);});
  };
  return L_$_F;
})()))},
    function(){return resolve(L_newDefine)("highlight", 1, "highlight map = do\r\n  c = assocGetWithDefault 'fill' map nil\r\n  eq c '#fcc'\r\n    assocSet 'fill' 'red' map\r\n    eq c '#cfc'\r\n      assocSet 'fill' 'green' map\r\n      eq c '#ccf'\r\n        assocSet 'fill' 'blue' map\r\n        map", lazy(function(L_map){return (function(){"use strict";
  var L_c_0;
  L_c_0 = function(){"use strict";return resolve(L_assocGetWithDefault)("fill", L_map, L_nil);};

  return resolve(L_eq)(L_c_0, "#fcc")(function(){"use strict";return L$(resolve(L_assocSet))("fill", "red", L_map);})(function(){"use strict";return resolve(L_eq)(L_c_0, "#cfc")(function(){"use strict";return L$(resolve(L_assocSet))("fill", "green", L_map);})(function(){"use strict";return resolve(L_eq)(L_c_0, "#ccf")(function(){"use strict";return L$(resolve(L_assocSet))("fill", "blue", L_map);})(L_map);});})})()}))},
    function(){return resolve(L_newDefine)("treeFor", 1, "treeFor ast = treeForWith ast \\ast map . map", lazy(function(L_ast){return resolve(L_treeForWith)(L_ast, lazy(function(L_ast_0){return function(L_map){return resolve(L_map)}}))}))},
    function(){return resolve(L_newDefine)("treeForWith", 2, "treeForWith ast mapFunc = nodeSvg (nodeFor ast mapFunc)", lazy((function(){
  var L_$_F = function(L_ast, L_mapFunc) {
    return L_checkPartial(L_$_F, arguments) || resolve(L_nodeSvg)(function(){"use strict";return resolve(L_nodeFor)(L_ast, L_mapFunc);});
  };
  return L_$_F;
})()))},
    function(){return resolve(L_newDefine)("wrappedTreeFor", 1, "wrappedTreeFor ast = do\r\n  content = nodeFor ast \\ast map . map\r\n  svg (nodeSvg content) {'width':(border + (nodeWidth content)) 'height':(border + (nodeHeight content))}", lazy(function(L_ast){return (function(){"use strict";
  var L_content_0;
  L_content_0 = function(){"use strict";return resolve(L_nodeFor)(L_ast, lazy(function(L_ast_0){return function(L_map){return resolve(L_map)}}));};

  return resolve(L_svg)(function(){"use strict";return resolve(L_nodeSvg)(L_content_0);}, function(){"use strict";return resolve(L_aconsPair)(function(){"use strict";return resolve(L_cons)("width", function(){"use strict";return resolve(L_$o)(L_border, function(){"use strict";return resolve(L_nodeWidth)(L_content_0);});});}, function(){"use strict";return resolve(L_aconsPair)(function(){"use strict";return resolve(L_cons)("height", function(){"use strict";return resolve(L_$o)(L_border, function(){"use strict";return resolve(L_nodeHeight)(L_content_0);});});}, L_nil);});})})()}))},
    function(){return resolve(L_newDefine)("nodeFor", 2, "nodeFor ast mapFunc = do\r\n  t = getType ast\r\n  eq t 'lit'\r\n    createLitNode ast (show (ast \\v p . v)) mapFunc\r\n    eq t 'ref'\r\n      createRefNode ast (show (ast \\n p . n)) mapFunc\r\n      eq t 'lambda'\r\n        ast (\\v b p . createLambdaNode ast v b mapFunc)\r\n        eq t 'apply'\r\n          ast (\\f a . createApplyNode ast f a mapFunc)\r\n          eq t 'anno'\r\n            #ast (\\n d b . createApplyNode ast f a mapFunc)\r\n            ast (\\n d b . nodeFor b mapFunc)\r\n            log 2 makeNode (svgNode '') 0 0 0 0", lazy((function(){
  var L_$_F = function(L_ast, L_mapFunc) {
    return L_checkPartial(L_$_F, arguments) || (function(){"use strict";
  var L_t_0;
  L_t_0 = function(){"use strict";return resolve(L_getType)(L_ast);};

  return resolve(L_eq)(L_t_0, "lit")(function(){"use strict";return resolve(L_createLitNode)(L_ast, function(){"use strict";return resolve(L_show)(function(){"use strict";return resolve(L_ast)(lazy(function(L_v){return function(L_p){return resolve(L_v)}}));});}, L_mapFunc);})(function(){"use strict";return resolve(L_eq)(L_t_0, "ref")(function(){"use strict";return resolve(L_createRefNode)(L_ast, function(){"use strict";return resolve(L_show)(function(){"use strict";return resolve(L_ast)(lazy(function(L_n){return function(L_p){return resolve(L_n)}}));});}, L_mapFunc);})(function(){"use strict";return resolve(L_eq)(L_t_0, "lambda")(function(){"use strict";return resolve(L_ast)(lazy(function(L_v){return function(L_b){return function(L_p){return resolve(L_createLambdaNode)(L_ast, L_v, L_b, L_mapFunc)}}}));})(function(){"use strict";return resolve(L_eq)(L_t_0, "apply")(function(){"use strict";return resolve(L_ast)(lazy(function(L_f){return function(L_a){return resolve(L_createApplyNode)(L_ast, L_f, L_a, L_mapFunc)}}));})(function(){"use strict";return resolve(L_eq)(L_t_0, "anno")(function(){"use strict";return resolve(L_ast)(lazy(function(L_n){return function(L_d){return function(L_b){return resolve(L_nodeFor)(L_b, L_mapFunc)}}}));})(function(){"use strict";return resolve(L_log)(2, L_makeNode)(function(){"use strict";return resolve(L_svgNode)("");})(0)(0)(0)(0);});});});});})})();
  };
  return L_$_F;
})()))},
    function(){return resolve(L_newDefine)("redStyle", 0, "redStyle = [['stroke'|'black'] ['stroke-width'|2] ['fill'|'#fcc'] ['rx'|8] ['ry'|8]]", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("stroke", "black");}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("stroke-width", 2);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("fill", "#fcc");}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("rx", 8);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("ry", 8);}, L_nil);});});});});})},
    function(){return resolve(L_newDefine)("greenStyle", 0, "greenStyle = [['stroke'|'black'] ['stroke-width'|2] ['fill'|'#cfc'] ['rx'|8] ['ry'|8]]", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("stroke", "black");}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("stroke-width", 2);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("fill", "#cfc");}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("rx", 8);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("ry", 8);}, L_nil);});});});});})},
    function(){return resolve(L_newDefine)("blueStyle", 0, "blueStyle = [['stroke'|'black'] ['stroke-width'|2] ['fill'|'#ccf'] ['rx'|8] ['ry'|8]]", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("stroke", "black");}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("stroke-width", 2);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("fill", "#ccf");}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("rx", 8);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("ry", 8);}, L_nil);});});});});})},
    function(){return resolve(L_newDefine)("createLambdaNode", 4, "createLambdaNode ast v b mapFunc = do\r\n  rootBox = textNode (mapFunc ast greenStyle) 'lambda'\r\n  varBox = textNode (mapFunc ast greenStyle) v\r\n  bodyTree = nodeFor b mapFunc\r\n  childWidth = (nodeWidth varBox) + space + (nodeWidth bodyTree)\r\n  totalWidth = max childWidth (nodeWidth rootBox)\r\n  pad = max 0 (totalWidth - childWidth) / 2\r\n  rootBox = nodeTranslate rootBox (totalWidth / 2 - (nodeWidth rootBox) / 2) 0\r\n  varBox = nodeTranslate varBox pad (nodeHeight rootBox) + space\r\n  bodyTree = nodeTranslate bodyTree (pad + (nodeWidth varBox) + space) ((nodeHeight rootBox) + space)\r\n  log 3 makeNode\r\n    svgConcat [(nodeLine rootBox varBox) (nodeLine rootBox bodyTree) (nodeSvg varBox) (nodeSvg bodyTree) (nodeSvg rootBox)]\r\n    totalWidth\r\n    (nodeHeight rootBox) + space + (max (nodeHeight varBox) (nodeHeight bodyTree))\r\n    totalWidth / 2\r\n    (nodeHeight rootBox) / 2", lazy((function(){
  var L_$_F = function(L_ast, L_v, L_b, L_mapFunc) {
    return L_checkPartial(L_$_F, arguments) || (function(){"use strict";
  var L_rootBox_0, L_varBox_1, L_bodyTree_2, L_childWidth_3, L_totalWidth_4, L_pad_5, L_rootBox_6, L_varBox_7, L_bodyTree_8;
  L_rootBox_0 = function(){"use strict";return resolve(L_textNode)(function(){"use strict";return L$(resolve(L_mapFunc))(L_ast, L_greenStyle);}, "lambda");};
  L_varBox_1 = function(){"use strict";return resolve(L_textNode)(function(){"use strict";return L$(resolve(L_mapFunc))(L_ast, L_greenStyle);}, L_v);};
  L_bodyTree_2 = function(){"use strict";return resolve(L_nodeFor)(L_b, L_mapFunc);};
  L_childWidth_3 = function(){"use strict";return resolve(L_$o)(function(){"use strict";return resolve(L_$o)(function(){"use strict";return resolve(L_nodeWidth)(L_varBox_1);}, L_space);}, function(){"use strict";return resolve(L_nodeWidth)(L_bodyTree_2);});};
  L_totalWidth_4 = function(){"use strict";return resolve(L_max)(L_childWidth_3, function(){"use strict";return resolve(L_nodeWidth)(L_rootBox_0);});};
  L_pad_5 = function(){"use strict";return resolve(L_max)(0, function(){"use strict";return resolve(L_$f)(function(){"use strict";return resolve(L_$_)(L_totalWidth_4, L_childWidth_3);}, 2);});};
  L_rootBox_6 = function(){"use strict";return resolve(L_nodeTranslate)(L_rootBox_0, function(){"use strict";return resolve(L_$_)(function(){"use strict";return resolve(L_$f)(L_totalWidth_4, 2);}, function(){"use strict";return resolve(L_$f)(function(){"use strict";return resolve(L_nodeWidth)(L_rootBox_0);}, 2);});}, 0);};
  L_varBox_7 = function(){"use strict";return resolve(L_nodeTranslate)(L_varBox_1, L_pad_5, function(){"use strict";return resolve(L_$o)(function(){"use strict";return resolve(L_nodeHeight)(L_rootBox_6);}, L_space);});};
  L_bodyTree_8 = function(){"use strict";return resolve(L_nodeTranslate)(L_bodyTree_2, function(){"use strict";return resolve(L_$o)(function(){"use strict";return resolve(L_$o)(L_pad_5, function(){"use strict";return resolve(L_nodeWidth)(L_varBox_7);});}, L_space);}, function(){"use strict";return resolve(L_$o)(function(){"use strict";return resolve(L_nodeHeight)(L_rootBox_6);}, L_space);});};

  return resolve(L_log)(3, L_makeNode)(function(){"use strict";return resolve(L_svgConcat)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_nodeLine)(L_rootBox_6, L_varBox_7);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_nodeLine)(L_rootBox_6, L_bodyTree_8);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_nodeSvg)(L_varBox_7);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_nodeSvg)(L_bodyTree_8);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_nodeSvg)(L_rootBox_6);}, L_nil);});});});});});})(L_totalWidth_4)(function(){"use strict";return resolve(L_$o)(function(){"use strict";return resolve(L_$o)(function(){"use strict";return resolve(L_nodeHeight)(L_rootBox_6);}, L_space);}, function(){"use strict";return resolve(L_max)(function(){"use strict";return resolve(L_nodeHeight)(L_varBox_7);}, function(){"use strict";return resolve(L_nodeHeight)(L_bodyTree_8);});});})(function(){"use strict";return resolve(L_$f)(L_totalWidth_4, 2);})(function(){"use strict";return resolve(L_$f)(function(){"use strict";return resolve(L_nodeHeight)(L_rootBox_6);}, 2);})})();
  };
  return L_$_F;
})()))},
    function(){return resolve(L_newDefine)("createApplyNode", 4, "createApplyNode ast f a mapFunc = do\r\n  rootBox = textNode (mapFunc ast blueStyle) 'apply'\r\n  funcTree = nodeFor f mapFunc\r\n  argTree = nodeFor a mapFunc\r\n  childWidth = (nodeWidth argTree) + space + (nodeWidth funcTree)\r\n  totalWidth = max childWidth (nodeWidth rootBox)\r\n  pad = max 0 (totalWidth - childWidth) / 2\r\n  rootBox = nodeTranslate rootBox (totalWidth / 2 - (nodeWidth rootBox) / 2) 0\r\n  funcTree = nodeTranslate funcTree pad (nodeHeight rootBox) + space\r\n  argTree = nodeTranslate argTree (pad + (nodeWidth funcTree) + space) ((nodeHeight rootBox) + space)\r\n  makeNode\r\n    svgConcat [(nodeLine rootBox funcTree) (nodeLine rootBox argTree) (nodeSvg rootBox) (nodeSvg funcTree) (nodeSvg argTree)]\r\n    totalWidth\r\n    (nodeHeight rootBox) + space + (max (nodeHeight argTree) (nodeHeight funcTree))\r\n    totalWidth / 2\r\n    (nodeHeight rootBox) / 2", lazy((function(){
  var L_$_F = function(L_ast, L_f, L_a, L_mapFunc) {
    return L_checkPartial(L_$_F, arguments) || (function(){"use strict";
  var L_rootBox_0, L_funcTree_1, L_argTree_2, L_childWidth_3, L_totalWidth_4, L_pad_5, L_rootBox_6, L_funcTree_7, L_argTree_8;
  L_rootBox_0 = function(){"use strict";return resolve(L_textNode)(function(){"use strict";return L$(resolve(L_mapFunc))(L_ast, L_blueStyle);}, "apply");};
  L_funcTree_1 = function(){"use strict";return resolve(L_nodeFor)(L_f, L_mapFunc);};
  L_argTree_2 = function(){"use strict";return resolve(L_nodeFor)(L_a, L_mapFunc);};
  L_childWidth_3 = function(){"use strict";return resolve(L_$o)(function(){"use strict";return resolve(L_$o)(function(){"use strict";return resolve(L_nodeWidth)(L_argTree_2);}, L_space);}, function(){"use strict";return resolve(L_nodeWidth)(L_funcTree_1);});};
  L_totalWidth_4 = function(){"use strict";return resolve(L_max)(L_childWidth_3, function(){"use strict";return resolve(L_nodeWidth)(L_rootBox_0);});};
  L_pad_5 = function(){"use strict";return resolve(L_max)(0, function(){"use strict";return resolve(L_$f)(function(){"use strict";return resolve(L_$_)(L_totalWidth_4, L_childWidth_3);}, 2);});};
  L_rootBox_6 = function(){"use strict";return resolve(L_nodeTranslate)(L_rootBox_0, function(){"use strict";return resolve(L_$_)(function(){"use strict";return resolve(L_$f)(L_totalWidth_4, 2);}, function(){"use strict";return resolve(L_$f)(function(){"use strict";return resolve(L_nodeWidth)(L_rootBox_0);}, 2);});}, 0);};
  L_funcTree_7 = function(){"use strict";return resolve(L_nodeTranslate)(L_funcTree_1, L_pad_5, function(){"use strict";return resolve(L_$o)(function(){"use strict";return resolve(L_nodeHeight)(L_rootBox_6);}, L_space);});};
  L_argTree_8 = function(){"use strict";return resolve(L_nodeTranslate)(L_argTree_2, function(){"use strict";return resolve(L_$o)(function(){"use strict";return resolve(L_$o)(L_pad_5, function(){"use strict";return resolve(L_nodeWidth)(L_funcTree_7);});}, L_space);}, function(){"use strict";return resolve(L_$o)(function(){"use strict";return resolve(L_nodeHeight)(L_rootBox_6);}, L_space);});};

  return resolve(L_makeNode)(function(){"use strict";return resolve(L_svgConcat)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_nodeLine)(L_rootBox_6, L_funcTree_7);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_nodeLine)(L_rootBox_6, L_argTree_8);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_nodeSvg)(L_rootBox_6);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_nodeSvg)(L_funcTree_7);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_nodeSvg)(L_argTree_8);}, L_nil);});});});});});}, L_totalWidth_4, function(){"use strict";return resolve(L_$o)(function(){"use strict";return resolve(L_$o)(function(){"use strict";return resolve(L_nodeHeight)(L_rootBox_6);}, L_space);}, function(){"use strict";return resolve(L_max)(function(){"use strict";return resolve(L_nodeHeight)(L_argTree_8);}, function(){"use strict";return resolve(L_nodeHeight)(L_funcTree_7);});});}, function(){"use strict";return resolve(L_$f)(L_totalWidth_4, 2);}, function(){"use strict";return resolve(L_$f)(function(){"use strict";return resolve(L_nodeHeight)(L_rootBox_6);}, 2);})})();
  };
  return L_$_F;
})()))},
    function(){return resolve(L_newDefine)("createRefNode", 3, "createRefNode ast ref mapFunc = textNode (mapFunc ast redStyle) ref", lazy((function(){
  var L_$_F = function(L_ast, L_ref, L_mapFunc) {
    return L_checkPartial(L_$_F, arguments) || resolve(L_textNode)(function(){"use strict";return L$(resolve(L_mapFunc))(L_ast, L_redStyle);}, L_ref);
  };
  return L_$_F;
})()))},
    function(){return resolve(L_newDefine)("createLitNode", 3, "createLitNode ast lit mapFunc = textNode (mapFunc ast greenStyle) lit", lazy((function(){
  var L_$_F = function(L_ast, L_lit, L_mapFunc) {
    return L_checkPartial(L_$_F, arguments) || resolve(L_textNode)(function(){"use strict";return L$(resolve(L_mapFunc))(L_ast, L_greenStyle);}, L_lit);
  };
  return L_$_F;
})()))},
    function(){return resolve(L_newDefine)("textNode", 2, "textNode map txt = (svgMeasureText txt '') \\w h . do\r\n  nodeW = w + 24\r\n  nodeH = h + 14\r\n  makeNode\r\n    (svgConcat [(rect [['x'|2] ['y'|2] ['width'|nodeW] ['height'|nodeH] | map]) (text txt [['pointer-events' | 'none'] ['text-anchor'|\"middle\"] ['dominant-baseline'|\"mathematical\"] ['x'| 14 + w / 2] ['y'| border + h / 2] ['font-weight'|'bold']])])\r\n    nodeW\r\n    nodeH\r\n    nodeW / 2\r\n    nodeH / 2", lazy((function(){
  var L_$_F = function(L_map, L_txt) {
    return L_checkPartial(L_$_F, arguments) || L$(resolve(L_svgMeasureText))(L_txt, "", lazy(function(L_w){return function(L_h){return (function(){"use strict";
  var L_nodeW_0, L_nodeH_1;
  L_nodeW_0 = function(){"use strict";return resolve(L_$o)(L_w, 24);};
  L_nodeH_1 = function(){"use strict";return resolve(L_$o)(L_h, 14);};

  return resolve(L_makeNode)(function(){"use strict";return resolve(L_svgConcat)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_rect)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("x", 2);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("y", 2);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("width", L_nodeW_0);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("height", L_nodeH_1);}, L_map);});});});});}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_text)(L_txt, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("pointer-events", "none");}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("text-anchor", "middle");}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("dominant-baseline", "mathematical");}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("x", function(){"use strict";return resolve(L_$o)(14, function(){"use strict";return resolve(L_$f)(L_w, 2);});});}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("y", function(){"use strict";return resolve(L_$o)(L_border, function(){"use strict";return resolve(L_$f)(L_h, 2);});});}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("font-weight", "bold");}, L_nil);});});});});});});}, L_nil);});});}, L_nodeW_0, L_nodeH_1, function(){"use strict";return resolve(L_$f)(L_nodeW_0, 2);}, function(){"use strict";return resolve(L_$f)(L_nodeH_1, 2);})})()}}));
  };
  return L_$_F;
})()))}
  ]);
});
//# sourceMappingURL=parseAst.map
