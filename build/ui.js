// Generated by CoffeeScript 1.9.3
(function() {
  define(['handlebars', 'cs!./export.litcoffee'], function(Handlebars, Exports) {
    var activateScripts, activating, addController, addView, compile, controllers, create, getPendingViews, getView, hasView, initializePendingViews, mergeContext, mergeExports, pendingViews, registerHelper, removeController, removeView, renderView, root, simpleRenderView, templates, viewIdCounter, viewKey, withContext;
    compile = Handlebars.compile, create = Handlebars.create, registerHelper = Handlebars.registerHelper;
    mergeExports = Exports.mergeExports;
    templates = {};
    controllers = {};
    root = null;
    activating = false;
    viewIdCounter = 0;
    pendingViews = [];
    viewKey = function(type, context) {
      if (context) {
        return (type.trim()) + "/" + (context.trim());
      } else {
        return type != null ? type.trim() : void 0;
      }
    };
    addView = function(type, context, template) {
      var name;
      templates[name = viewKey(type, context)] = compile(template);
      return Handlebars.registerPartial(name, "{{#viewWrapper '" + name + "' this}}" + template + "{{/viewWrapper}}");
    };
    removeView = function(type, context, template) {
      var name;
      delete templates[name = viewKey(type, context)];
      return Handlebars.unregisterPartial(name);
    };
    getView = hasView = function(type, context) {
      return templates[viewKey(type, context)] || templates[type];
    };
    withContext = function(context, func) {
      var oldContext, value;
      oldContext = root.context;
      root.context = context;
      try {
        value = func();
      } finally {
        root.context = oldContext;
      }
      return value;
    };
    mergeContext = function(subcontext, func) {
      return withContext(_.merge({}, root.context, subcontext), func);
    };
    Handlebars.registerHelper('view', function(item, contextName, options) {
      var block, data;
      if (!options) {
        options = contextName;
        contextName = null;
      }
      data = typeof item === 'string' ? (block = context.editor.options.getBlock(data), block != null ? block.yaml : void 0) : (item != null ? item.yaml : void 0) && item._id ? (block = item, item.yaml) : (block = null, item);
      if (data != null ? data.type : void 0) {
        return renderView(data.type, contextName, data, null, false, block);
      }
    });
    Handlebars.registerHelper('viewWrapper', function(name, data, opts) {
      return simpleRenderView("data-view='" + name + "' class='view'", name, opts.fn, this);
    });
    renderView = function(type, contextName, data, targets, block) {
      var attr, attrs, classAttr, i, isTop, key, len, node, ref, ref1, ref2, results, settings, template, value;
      isTop = !((ref = root.context) != null ? ref.topView : void 0);
      key = viewKey(type, contextName);
      if (!(template = templates[key])) {
        key = type;
        contextName = null;
        if (!(template = templates[key])) {
          return;
        }
      }
      settings = {
        type: type,
        contextName: contextName
      };
      if (isTop) {
        settings.subviews = {};
        if (block) {
          settings.subviews[block._id] = true;
        }
      }
      attrs = "data-view='" + key + "'";
      classAttr = 'view';
      ref2 = (ref1 = root.context.viewAttrs) != null ? ref1 : {};
      for (attr in ref2) {
        value = ref2[attr];
        if (attr === 'class') {
          classAttr += " " + value;
        } else {
          attrs += " " + attr + "='" + value + "'";
        }
      }
      attrs += " class='" + classAttr + "'";
      if (block) {
        attrs += " data-view-block='" + block._id + "'";
      }
      if (targets) {
        if (!isTop && block) {
          root.context.subviews[block._id] = true;
        }
        results = [];
        for (i = 0, len = targets.length; i < len; i++) {
          node = targets[i];
          settings.view = node;
          results.push(mergeContext(settings, function() {
            var html;
            root.context.data = data;
            if (block) {
              root.context.block = block;
            }
            if (isTop) {
              root.context.topView = node;
            }
            html = template(data, {
              data: root.context
            });
            if (isTop) {
              attrs += " data-ids='" + (settings.subviews.join(' ')) + "'";
            }
            html = "<span " + attrs + ">'" + html + "</span>";
            return activateScripts(node);
          }));
        }
        return results;
      } else {
        return mergeContext(settings, function() {
          return simpleRenderView(attrs, key, template, data, block);
        });
      }
    };
    simpleRenderView = function(attrs, key, template, data, block) {
      var id;
      id = "view-" + (viewIdCounter++);
      pendingViews.push([id, root.context]);
      attrs += " id='" + id + "'";
      if (block) {
        root.context.subviews[block._id] = true;
      }
      return "<span " + attrs + ">" + (template(data, {
        data: root.context
      })) + "</span>";
    };
    initializePendingViews = function() {
      var context, i, len, p, ref, results, viewId;
      p = pendingViews;
      pendingViews = [];
      results = [];
      for (i = 0, len = p.length; i < len; i++) {
        ref = p[i], viewId = ref[0], context = ref[1];
        results.push(activateScripts($("#" + viewId), context));
      }
      return results;
    };
    activateScripts = function(el, context) {
      if (!activating) {
        return withContext(context, function() {
          var i, j, len, len1, newScript, ref, ref1, ref2, script;
          activating = true;
          try {
            ref = $(el).find('script');
            for (i = 0, len = ref.length; i < len; i++) {
              script = ref[i];
              if (!script.type || script.type === 'text/javascript') {
                newScript = document.createElement('script');
                newScript.type = 'text/javascript';
                newScript.textContent = script.textContent;
                newScript.src = script.src;
                root.currentScript = newScript;
                script.parentNode.insertBefore(newScript, script);
                script.remove();
              }
            }
            ref1 = $(el).find('script[type="text/coffeescript"]').add($(el).find('script[type="text/literate-coffeescript"]'));
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              script = ref1[j];
              root.currentScript = script;
              CoffeeScript.run(script.innerHTML);
            }
            return (ref2 = controllers[el.attr('data-view')]) != null ? ref2.initializeView(el) : void 0;
          } finally {
            root.currentScript = null;
            activating = false;
          }
        });
      }
    };
    addController = function(type, name, func) {
      return controllers[viewKey(type, name)] = func;
    };
    removeController = function(type, name, func) {
      return delete controllers[viewKey(type, name)];
    };
    getPendingViews = function() {
      return pendingViews;
    };
    return root = mergeExports({
      UI: {
        withContext: withContext,
        mergeContext: mergeContext,
        renderView: renderView,
        addView: addView,
        removeView: removeView,
        hasView: hasView,
        getView: getView,
        addController: addController,
        removeController: removeController,
        initializePendingViews: initializePendingViews,
        getPendingViews: getPendingViews,
        viewKey: viewKey,
        context: null
      }
    }).UI;
  });

}).call(this);

//# sourceMappingURL=ui.js.map
