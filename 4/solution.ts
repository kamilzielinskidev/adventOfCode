import * as fs from "fs";
import * as path from "path";

const REQUIRED_FIELDS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");
  const passports = data.split("\n\n");
  const passportsValues = passports.map((passport) =>
    passport
      .split("\n")
      .map((splittedLinePassport) => splittedLinePassport.split(" "))
      .flat()
  );
  const passportsFields = passportsValues.map((values) =>
    values.map((value) => value.match(/.*:/g)[0].substr(0, 3))
  );

  const validPassports = passportsFields.reduce(
    (validPassports, nextPassport) =>
      REQUIRED_FIELDS.reduce(
        (isValid, nextRequiredField) =>
          nextPassport.includes(nextRequiredField) ? isValid : false,
        true
      )
        ? [...validPassports, nextPassport]
        : validPassports,
    []
  );

  console.log(validPassports.length);
};

main();
