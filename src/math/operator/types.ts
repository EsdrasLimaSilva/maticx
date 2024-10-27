export interface Operator {
  token: string;
  precedence: number;
  associativity: "L" | "R";
}
