import * as fs from "fs";

import * as path from "path";

const [rawRules, rawMessages] = fs
  .readFileSync(path.join(__dirname, "./data"), "utf8")
  .split("\n\n")
  .map((v) => v.split("\n"));

const mapRule = (rule: string) => {
  const ruleNumber = parseInt(rule.match(/\d+/g)[0]);
  const ruleSet = rule
    .match(/:.*/g)[0]
    .slice(1)
    .split("|")
    .map((v) => v.trim())
    .map((v) => v.split(" ").map((v) => parseInt(v) || v.slice(1, 2)));

  const rules =
    typeof ruleSet[0][0] === "string"
      ? ruleSet[0][0]
      : ruleSet.length === 1
      ? ruleSet.flat()
      : ruleSet;

  return { ruleNumber, rules };
};

const rules: Record<string, string | number[] | number[][]> = rawRules
  .map(mapRule)
  .reduce(
    (acc, { ruleNumber, rules }) => ({ ...acc, [ruleNumber]: rules }),
    {}
  );

const switchDeep = (rule: string | (number | number[])[]) => {
  if (typeof rule === "string") {
    return rule;
  } else if (rule.every((ruleSet) => typeof ruleSet === "number")) {
    return rule.map((rule: number) => switchDeep(rules[rule])).join("");
  } else {
    return `(${rule
      .map((ruleSet: number[]) => switchDeep(ruleSet))
      .join("|")})`;
  }
};

const regexExpression = new RegExp(`^${switchDeep(rules[0])}$`);

console.log(rawMessages.filter((msg) => regexExpression.test(msg)).length);
