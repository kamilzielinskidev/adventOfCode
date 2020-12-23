const cups = [3, 9, 4, 6, 1, 8, 5, 2, 7];

const pick3CupsClockwise = (index: number) => {
  const pickedCups = [];
  if (index === cups.length - 3) {
    pickedCups.push(cups.splice(cups.length - 2, 2));
    pickedCups.push(cups.splice(0, 1));
  } else if (index === cups.length - 2) {
    pickedCups.push(cups.splice(cups.length - 1, 1));
    pickedCups.push(cups.splice(0, 2));
  } else if (index === cups.length - 1) {
    pickedCups.push(cups.splice(0, 3));
  } else {
    pickedCups.push(cups.splice(index + 1, 3));
  }
  return pickedCups.flat();
};

const findDestination = (current: number) => {
  const minusOne = cups.find((v) => v === current - 1);
  if (minusOne) {
    return minusOne;
  } else if (current === Math.min(...cups)) {
    return Math.max(...cups);
  } else {
    return findDestination(current - 1);
  }
};

let currentCup = cups[0];

const round = () => {
  const currentCupIndex = cups.findIndex((v) => v === currentCup);
  const picked = pick3CupsClockwise(currentCupIndex);
  const destination = findDestination(currentCup);
  currentCup = cups[currentCupIndex + 1] || cups[0];
  const destinationIndex = cups.findIndex((v) => v === destination);
  cups.splice(destinationIndex + 1, 0, ...picked);
};

for (let i = 0; i < 100; i++) {
  round();
}

console.log(cups);
