import { Operator } from "./types";

export const TOKENS = {
  LEFT_PARENTHESIS: "(",
  RIGHT_PARENTHESIS: ")",
  PLUS: "+",
  MINUS: "-",
  ASTERISK: "*",
  SLASH: "/",
};

export const OPERATORS: Operator[] = [
  {
    token: TOKENS.LEFT_PARENTHESIS,
    precedence: 0,
    associativity: "L",
  },
  {
    token: TOKENS.RIGHT_PARENTHESIS,
    precedence: 0,
    associativity: "L",
  },
  { token: TOKENS.PLUS, precedence: 1, associativity: "L" },
  { token: TOKENS.MINUS, precedence: 1, associativity: "L" },
  { token: TOKENS.ASTERISK, precedence: 2, associativity: "L" },
  { token: TOKENS.SLASH, precedence: 2, associativity: "L" },
];

export function getOperator(token: string) {
  const operator = OPERATORS.find(
    (operator) => operator.token === token.toLowerCase()
  );
  if (!operator) throw new Error(`Invalid operator: ${token}`);

  return operator;
}

export function getToken(operator: Operator) {
  return OPERATORS.find((op) => equalOperators(op, operator)).token;
}

export function hasLeftAssociativity(operator: Operator) {
  return operator.associativity === "L";
}

export function hasRightAssociativity(operator: Operator) {
  return operator.associativity === "R";
}

export function equalOperators(o1: Operator, o2: Operator) {
  return o1.token === o2.token && o1.precedence === o2.precedence;
}
