defaultEnv = {}

if window?
  # running in a browser
  window.global = window
  output = null
  defaultEnv.write = (msg)->
    if !output? then output = document.getElementById('output')
    output.innerHTML += "<span>#{msg}</span>"
    output.lastChild.scrollIntoView()
  defaultEnv.prompt = (msg, cont)-> cont(window.prompt(msg))
  window.Prim = root = {}
  Leisure = window.Leisure
else
  # running in node
  root = exports ? this
  Leisure = require('./leisure')
  Pretty = require('./pretty')
  U = require('util')
  RL = require('readline')
  tty = null
  defaultEnv.write = (msg)-> process.stdout.write(msg)
  defaultEnv.prompt = (msg, cont)-> tty.question(msg, cont)

setTty = (rl)-> tty = rl

define = Leisure.define
getType = Leisure.getType
laz = Leisure.laz

define 'is', (value)-> (type)-> if value()?.type == type().dataType then `_true()` else `_false()`
define 'eq', (a)-> (b)-> if a() == b() then `_true()` else` _false()`
define 'getType', (value)-> if type = getType(value()) then _some()(->type) else _none()
define 'parse', (value)->
  [prepped, err] = Leisure.prepare String(value())
  if err? then _right()(laz("Error: #{err}"))
  else
    [ast, err, rest] = Leisure.parseFull(prepped)
    if err? then _right()(laz("Error: #{err}"))
    else if rest?.trim() then _right()(laz("Error, input left after parsing: '#{rest.trim()}'"))
    else _left()(laz(ast))
define 'pretty', (value)-> Pretty.print(value())

define '+', (a)->(b)->a() + b()
define '-', (a)->(b)->a() - b()
define '*', (a)->(b)->a() * b()
define '/', (a)->(b)->a() / b()
define '%', (a)->(b)->a() % b()
define 'floor', (a)->Math.floor(a())
define 'ceil', (a)->Math.ceil(a())
define 'round', (a)->Math.round(a())

define 'randInt', (from)->(to)->
  makeMonad 'end', (env, cont)->
    cont Math.floor(from() + Math.random() * (to() - from() + 1))

define 'rand', ()->
  makeMonad 'end', (env, cont)->
    cont (Math.random())

define '>', (a)->(b)->if a() > b() then `_true()` else `_false()`
define '<', (a)->(b)->if a() < b() then `_true()` else `_false()`
define 'gt', (a)->(b)->if a() > b() then `_true()` else `_false()`
define 'gte', (a)->(b)->if a() >= b() then `_true()` else `_false()`
define 'lt', (a)->(b)->if a() < b() then `_true()` else `_false()`
define 'lte', (a)->(b)->if a() <= b() then `_true()` else `_false()`

eventCmds = []
running = false

leisureEvent = (leisureFuncName, evt)->
  currentEvent = evt
  monad = Leisure.eval("#{Leisure.nameSub(leisureFuncName)}()")(laz(evt))
  runMonad monad, defaultEnv, ->

runMonad = (monad, env, cont)->
  eventCmds.push ->
    runMonads monad, env, (value)->
      if eventCmds.length then eventCmds.shift()()
      running = false
      cont(value)
  if !running and eventCmds.length
    running = true
    eventCmds.shift()()

runMonads = (monad, env, cont)->
  if monad?.cmd?
    monad.cmd env, (value) ->
      if monad.binding? then runMonads monad.binding(-> value), env, cont
      else cont(value)
  else throw new Error("Attempted to run something that's not a monad")

# Make a new function and hide func and binding in properties on it
# making them inaccessible to pure Leisure code
# so people won't accidentally fire off side effects
makeMonad = (binding, guts)->
  m = ->
  m.cmd = guts
  m.type = 'monad'
  if binding != "end" then m.binding = binding
  m

define 'eventX', (evt)-> evt().x

define 'eventY', (evt)-> evt().y

define 'eventTargetId', (evt)-> evt().target.id

define 'return', (v)->
  makeMonad 'end', (env, cont)->cont(v())

define 'log', (msg)->(value)->
  if (msg().type != 'cons') then defaultEnv.write("#{msg()}") else defaultEnv.write(concatList(msg()))
  defaultEnv.write("\n")
  value()

define 'print', (msg)->
  makeMonad 'end', (env, cont)->
    if msg() != _nil() then env.write("#{msg()}\n")
    cont(_false)

define 'prompt', (msg)->
  makeMonad 'end', (env, cont)->
    env.prompt(String(msg()), (input)-> cont(input))

define 'bind', (m)->(binding)->
  makeMonad binding(), (env, cont)-> runMonads m(), env, cont

head = (l)->l ->(hh)->(tt)->hh()
tail = (l)->l ->(hh)->(tt)->tt()

concatList = (l)->
  if l == _nil() then ""
  else (head l) + concatList tail l

define 'concat', (l)-> concatList(l())

define 'js', (codeList)->
  makeMonad 'end', (env, cont)->
    cl = codeList()
    if cl != _nil() && cl.type != 'cons' then throw new Error("js expects a list for its code")
    cont(eval(concatList(cl)))

define 'browser', (codeList)->
  makeMonad 'end', (env, cont)->
    if window?
      cl = codeList()
      if cl != _nil() && cl.type != 'cons' then throw new Error("js expects a list for its code")
      cont(eval(concatList(cl)))
    else cont(null)

values = {}

define 'getValue', (name)->
  makeMonad 'end', (env, cont)->
    cont values[name()]

define 'setValue', (name)->(value)->
  makeMonad 'end', (env, cont)->
    values[name()] = value()
    cont _false

define 'createS', ->
  makeMonad 'end', (env, cont)->
    cont {value: null}

define 'getS', (state)->
  makeMonad 'end', (env, cont)->
    cont state().value

define 'setS', (state)->(value)->
  makeMonad 'end', (env, cont)->
    state().value = value()
    cont(_false)

root.setTty = setTty
root.runMonad = runMonad
root.makeMonad = makeMonad
root.tokenDefs = []
root.leisureEvent = leisureEvent
root.defaultEnv = defaultEnv

if window? then window.leisureEvent = leisureEvent
