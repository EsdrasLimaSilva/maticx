"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "evaluate", {
  enumerable: true,
  get: function get() {
    return _evaluate.evaluate;
  }
});
require("core-js/stable");
var _evaluate = require("./math/evaluate");