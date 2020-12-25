const doorValue = 2069194;
const cardValue = 16426071;

const initialValue = 1;
const initialSubject = 7;

let value = initialValue;
let loop = 0;

while (value !== doorValue) {
  value *= 7;
  value = value % 20201227;
  loop += 1;
}

const getEncryption = (value: number, subject: number, loops: number) => {
  let newValue = value;
  for (let i = 0; i < loops; i++) {
    newValue = (newValue * subject) % 20201227;
  }
  return newValue;
};

console.log(getEncryption(1, cardValue, loop));
