import { toRPN } from ".";

describe("Reverse-Polish Notation", () => {
  const EXPRESSIONS = [
    {
      expression: "1+3-5",
      result: "1 3 + 5 -",
    },
    {
      expression: "2*3+4",
      result: "2 3 * 4 +",
    },
    {
      expression: "(5+6)*2",
      result: "5 6 + 2 *",
    },
    {
      expression: "4/2+8",
      result: "4 2 / 8 +",
    },
    {
      expression: "3*(4-2)",
      result: "3 4 2 - *",
    },
    {
      expression: "6+2*(5-3)",
      result: "6 2 5 3 - * +",
    },
    {
      expression: "(1+2)*(3-4/2)",
      result: "1 2 + 3 4 2 / - *",
    },
    {
      expression: "3-5*(2+3)/(2+12)",
      result: "3 5 2 3 + * 2 12 + / -",
    },
    {
      expression: "(5+(2+5))",
      result: "5 2 5 + +",
    },
  ];

  it("Should correctly evaluate all expressions", () => {
    EXPRESSIONS.forEach((exp) => {
      const expectedResult = exp.result;
      const result = toRPN(exp.expression);

      expect(result).toEqual(expectedResult);
    });
  });
});
