import * as fs from "fs";
import * as path from "path";

const recipes = fs
  .readFileSync(path.join(__dirname, "./data"), "utf8")
  .split("\n")
  .map((recipe) => {
    const ingredientsMatch = recipe.match(/.*\(/g)[0];
    const ingredients = ingredientsMatch
      .slice(0, ingredientsMatch.length - 2)
      .split(" ");
    const allergensMatch = recipe.match(/\(.*\)/g)[0];
    const allergens = allergensMatch
      .slice(10, allergensMatch.length - 1)
      .split(", ");

    return { ingredients, allergens };
  });

const allAllergens = recipes
  .map((v) => v.allergens)
  .flat()
  .reduce(
    (allAllergens, nextAllergen) =>
      allAllergens.includes(nextAllergen)
        ? allAllergens
        : [...allAllergens, nextAllergen],
    [] as string[]
  );

const mappedAllergens = allAllergens.reduce(
  (acc, allergen) => ({
    ...acc,
    [allergen]: recipes
      .filter(({ allergens }) => allergens.includes(allergen))
      .map((v) => v.ingredients),
  }),
  {} as Record<string, string[][]>
);

const ingredientsWithAllergens = Object.entries(mappedAllergens)
  .reduce(
    (acc, [_, ingredients]) => [
      ...acc,
      ingredients.reduce((a, b) => a.filter((c) => b.includes(c))),
    ],
    [] as string[]
  )
  .flat()
  .reduce((acc, v) => (acc.includes(v) ? acc : [...acc, v]), []);

console.log(
  recipes
    .map((v) =>
      v.ingredients.filter((v) => !ingredientsWithAllergens.includes(v))
    )
    .flat().length
);
