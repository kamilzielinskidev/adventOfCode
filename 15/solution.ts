const data = [2, 0, 1, 7, 4, 14, 18];

for (let i = data.length - 1; i <= 2020; i = i + 1) {
  const reversedData = [...data].reverse();
  const indexOfLastOccuranceInArray = reversedData
    .slice(1)
    .findIndex((val) => val === data[i]);
  if (indexOfLastOccuranceInArray === -1) {
    data.push(0);
    continue;
  }
  data.push(indexOfLastOccuranceInArray + 1);
}

console.log(data[2019]);
