import * as fs from "fs";
import * as path from "path";

const trim = (v: string) => v.trim();
const splitBy = (splitter: string) => (v: string) => v.split(splitter);
const matches = (regex: RegExp) => (v: string) => v.match(regex);
const parseIntFc = (v: string) => parseInt(v);
const deepMap = <T, R>(mapper: (v: T) => R) => (arr: T[]) => arr.map(mapper);

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");
  const parts = data.split("\n\n");
  const getRuleVeryficator = (rule: string) => (val: number) =>
    rule
      .split("or")
      .map(trim)
      .map(matches(/\d+/g))
      .map(deepMap(parseIntFc))
      .map(([min, max]) => ({ min, max }))
      .some(({ min, max }) => val >= min && val <= max);

  const rules = parts[0]
    .split("\n")
    .slice(1)
    .map((rule) => rule.match(":.*")[0].split("").slice(2).join(""))
    .map(getRuleVeryficator);

  const nearByTickets = parts[2].split("\n").slice(1);

  const parsedTickets = nearByTickets
    .map(splitBy(","))
    .map(deepMap(parseIntFc));

  const invalidFields = parsedTickets
    .map((nextTicket) =>
      nextTicket.reduce<number[]>(
        (invalidFields, nextField) =>
          rules.some((rule) => rule(nextField))
            ? invalidFields
            : [...invalidFields, nextField],
        []
      )
    )
    .flat();
  console.log(invalidFields.reduce((acc, v) => acc + v, 0));
};

main();
