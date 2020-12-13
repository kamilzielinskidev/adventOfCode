import * as fs from "fs";
import * as path from "path";

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");
  const groups = data.split("\n\n");
  const groupsAllResponses = groups.map((group) => group.split("\n").join(""));
  const groupsUniqueResponses = groupsAllResponses.map(
    (responses) =>
      responses
        .split("")
        .reduce(
          (uniqueResponses, nextResponse) =>
            uniqueResponses.includes(nextResponse)
              ? uniqueResponses
              : [...uniqueResponses, nextResponse],
          []
        ).length
  );
  const allGroupsUniqueResponses = groupsUniqueResponses.reduce(
    (acc, next) => acc + next,
    0
  );
  console.log(allGroupsUniqueResponses);
};

main();
