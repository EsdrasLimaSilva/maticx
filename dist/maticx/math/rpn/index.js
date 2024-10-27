"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeExpression = sanitizeExpression;
exports.toRPN = toRPN;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/esnext.string.replace-all.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _stack = require("../../stack");
var _operator = require("../operator");
function sanitizeExpression(expression) {
  return expression.replaceAll(" ", "");
}
function toRPN(infixExpression) {
  var operatorStack = new _stack.Stack();
  var output = "";
  var sanitizedExpression = sanitizeExpression(infixExpression);
  var tokens = sanitizedExpression.match(/\d+|\D/g);
  tokens.forEach(function (token) {
    if (!isNaN(Number(token))) {
      output += " ".concat(token);
      return;
    }
    var operator = (0, _operator.getOperator)(token);
    if (operatorStack.isEmpty()) {
      operatorStack.push(operator);
      return;
    }
    if ((0, _operator.equalOperators)(operator, (0, _operator.getOperator)(_operator.TOKENS.LEFT_PARENTHESIS))) {
      operatorStack.push(operator);
      return;
    }
    if ((0, _operator.equalOperators)(operator, (0, _operator.getOperator)(_operator.TOKENS.RIGHT_PARENTHESIS))) {
      while (!operatorStack.isEmpty() && !(0, _operator.equalOperators)(operatorStack.top(), (0, _operator.getOperator)(_operator.TOKENS.LEFT_PARENTHESIS))) {
        output += " ".concat(operatorStack.pop().token);
      }
      if (operatorStack.isEmpty()) throw new Error("Invalid expression: missing enclosing parenthesis");
      operatorStack.pop();
      return;
    }
    while (!operatorStack.isEmpty() && ((0, _operator.hasLeftAssociativity)(operator) && operator.precedence <= operatorStack.top().precedence || (0, _operator.hasRightAssociativity)(operator) && operator.precedence < operatorStack.top().precedence)) {
      output += " ".concat(operatorStack.pop().token);
    }
    operatorStack.push(operator);
  });
  while (!operatorStack.isEmpty()) output += " ".concat(operatorStack.pop().token);
  return output.trim();
}