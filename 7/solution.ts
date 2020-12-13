import * as fs from "fs";
import * as path from "path";

const LOOKING_FOR_BAG = "shiny gold";

const lookForBag = (bag: string, bags: Record<string, string[]>) => {
  const bagsList: string[] = [];
  const bagsThatContainsTheBag = Object.entries(bags)
    .filter(([_, bags]) => bags.includes(bag))
    .map(([bag]) => bag);
  bagsList.push(...bagsThatContainsTheBag);
  for (bag of bagsThatContainsTheBag) {
    bagsList.push(...lookForBag(bag, bags));
  }
  return bagsList;
};

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");
  const bags = data.split("\n");
  const mappedBags = bags
    .map((bag) => {
      const bigBag = bag
        .match(/.*?bags/g)[0]
        .replace(/bags/g, "")
        .trim();
      const contains = bag
        .match(/contain.*/g)[0]
        .replace(/contain/g, "")
        .replace(/bag(s?)/g, "")
        .split(",")
        .map((bag) =>
          bag
            .match(/[a-z]+/g)
            .join(" ")
            .trim()
        );

      return { [bigBag]: contains };
    })
    .reduce((bags, bag) => ({ ...bags, ...bag }), {});
  const uniqueBagsThatContainsBag = lookForBag(
    LOOKING_FOR_BAG,
    mappedBags
  ).reduce(
    (uniqueBags, nextBag) =>
      uniqueBags.includes(nextBag) ? uniqueBags : [...uniqueBags, nextBag],
    [] as string[]
  );
  console.log(uniqueBagsThatContainsBag.length);
};

main();
