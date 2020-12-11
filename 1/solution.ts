import { data } from "./data";

const SUM_TO_FIND = 2020;

const main = () => {
  data.forEach((val1) => {
    data.forEach((val2) => {
      if (val1 + val2 === SUM_TO_FIND) {
        console.log(val1 * val2);
      }
    });
  });
};

console.log(main());
