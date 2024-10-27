import { Stack } from "../../stack";
import {
  equalOperators,
  getOperator,
  hasLeftAssociativity,
  hasRightAssociativity,
  TOKENS,
} from "../operator";
import { Operator } from "../operator/types";

export function sanitizeExpression(expression: string) {
  return expression.replaceAll(" ", "");
}

export function toRPN(infixExpression: string) {
  const operatorStack = new Stack<Operator>();
  let output = "";

  const sanitizedExpression = sanitizeExpression(infixExpression);
  const tokens = sanitizedExpression.match(/\d+|\D/g);

  tokens.forEach((token) => {
    if (!isNaN(Number(token))) {
      output += ` ${token}`;
      return;
    }

    const operator = getOperator(token);

    if (operatorStack.isEmpty()) {
      operatorStack.push(operator);
      return;
    }

    if (equalOperators(operator, getOperator(TOKENS.LEFT_PARENTHESIS))) {
      operatorStack.push(operator);
      return;
    }

    if (equalOperators(operator, getOperator(TOKENS.RIGHT_PARENTHESIS))) {
      while (
        !operatorStack.isEmpty() &&
        !equalOperators(
          operatorStack.top(),
          getOperator(TOKENS.LEFT_PARENTHESIS)
        )
      ) {
        output += ` ${operatorStack.pop().token}`;
      }

      if (operatorStack.isEmpty())
        throw new Error("Invalid expression: missing enclosing parenthesis");

      operatorStack.pop();
      return;
    }

    while (
      !operatorStack.isEmpty() &&
      ((hasLeftAssociativity(operator) &&
        operator.precedence <= operatorStack.top().precedence) ||
        (hasRightAssociativity(operator) &&
          operator.precedence < operatorStack.top().precedence))
    ) {
      output += ` ${operatorStack.pop().token}`;
    }

    operatorStack.push(operator);
  });

  while (!operatorStack.isEmpty()) output += ` ${operatorStack.pop().token}`;

  return output.trim();
}
