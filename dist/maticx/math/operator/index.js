"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOKENS = exports.OPERATORS = void 0;
exports.equalOperators = equalOperators;
exports.getOperator = getOperator;
exports.getToken = getToken;
exports.hasLeftAssociativity = hasLeftAssociativity;
exports.hasRightAssociativity = hasRightAssociativity;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.to-string.js");
var TOKENS = exports.TOKENS = {
  LEFT_PARENTHESIS: "(",
  RIGHT_PARENTHESIS: ")",
  PLUS: "+",
  MINUS: "-",
  ASTERISK: "*",
  SLASH: "/"
};
var OPERATORS = exports.OPERATORS = [{
  token: TOKENS.LEFT_PARENTHESIS,
  precedence: 0,
  associativity: "L"
}, {
  token: TOKENS.RIGHT_PARENTHESIS,
  precedence: 0,
  associativity: "L"
}, {
  token: TOKENS.PLUS,
  precedence: 1,
  associativity: "L"
}, {
  token: TOKENS.MINUS,
  precedence: 1,
  associativity: "L"
}, {
  token: TOKENS.ASTERISK,
  precedence: 2,
  associativity: "L"
}, {
  token: TOKENS.SLASH,
  precedence: 2,
  associativity: "L"
}];
function getOperator(token) {
  var operator = OPERATORS.find(function (operator) {
    return operator.token === token.toLowerCase();
  });
  if (!operator) throw new Error("Invalid operator: ".concat(token));
  return operator;
}
function getToken(operator) {
  return OPERATORS.find(function (op) {
    return equalOperators(op, operator);
  }).token;
}
function hasLeftAssociativity(operator) {
  return operator.associativity === "L";
}
function hasRightAssociativity(operator) {
  return operator.associativity === "R";
}
function equalOperators(o1, o2) {
  return o1.token === o2.token && o1.precedence === o2.precedence;
}