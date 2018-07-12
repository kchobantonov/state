"use strict";
exports.__esModule = true;
var state = require("@steelbreeze/state");
var model = new state.StateMachine("model");
var initial = new state.PseudoState("initial", model, state.PseudoStateKind.Initial);
var on = new state.State("on", model);
var off = new state.State("off", model);
var clean = new state.State("clean", model);
var final = new state.State("final", model);
var history = new state.PseudoState("history", on, state.PseudoStateKind.ShallowHistory);
var idle = new state.State("idle", on);
var moveItem = new state.State("moveItem", on);
var showMoveItemPattern = new state.State("showMoveItemPattern", on);
var hideMoveItemPattern = new state.State("hideMoveItemPattern", on);
initial.to(idle);
on.to(off).when(function (i, s) { return s === "Disable"; });
off.to(history).when(function (i, s) { return s === "Enable"; });
on.to(clean).when(function (i, s) { return s === "DestroyInput"; });
off.to(clean).when(function (i, s) { return s === "DestroyInput"; });
clean.to(final);
idle.to(moveItem).when(function (i, s) { return s === "TransformInput"; });
moveItem.to(idle).when(function (i, s) { return s === "ReleaseInput"; });
idle.to(showMoveItemPattern).when(function (i, s) { return s === "ReleaseInput"; });
showMoveItemPattern.to(hideMoveItemPattern).when(function (i, s) { return s === "ReleaseInput"; });
hideMoveItemPattern.to(idle);
var instance = new state.DictionaryInstance("florent");
model.initialise(instance);
model.evaluate(instance, "Disable");
model.evaluate(instance, "Enable");
