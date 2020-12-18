import * as fs from "fs";
import * as path from "path";

const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");

let expressions = data.split("\n");

const multiply = (val1: number, val2: number) => val1 * val2;
const sum = (val1: number, val2: number) => val1 + val2;

const getSingleParentheses = (expression: string) => {
  const current: string[] = [];
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (current.includes("(") && char !== "(") {
      current.push(char);
    }
    if (char === "(") {
      current.length = 0;
      current.push(char);
    }
    if (char === ")") {
      return current.join("");
    }
  }
};

const resolve = (expression: string) => {
  const values = expression.split(" ");
  let acc = parseInt(values[0]);
  for (let i = 1; i < expression.length; i++) {
    if (values[i] === "*") {
      acc *= parseInt(values[i + 1]);
    }
    if (values[i] === "+") {
      acc += parseInt(values[i + 1]);
    }
  }
  return acc.toString();
};

const resolveParentheses = (expression: string) => {
  const expressionWOParenteses = expression.slice(1, expression.length - 1);
  return resolve(expressionWOParenteses);
};

const resolveExpression = (expression: string) => {
  while (expression.includes("(")) {
    const parentesesExpression = getSingleParentheses(expression);

    expression = expression.replace(
      parentesesExpression,
      resolveParentheses(parentesesExpression)
    );
  }
  return parseInt(resolve(expression));
};

console.log(expressions.map(resolveExpression).reduce((acc, v) => acc + v, 0));
