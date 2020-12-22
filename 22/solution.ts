import * as fs from "fs";
import * as path from "path";

let [player1Deck, player2Deck] = fs
  .readFileSync(path.join(__dirname, "./data"), "utf8")
  .split("\n\n")
  .map((v) =>
    v
      .split("\n")
      .slice(1)
      .map((v) => parseInt(v))
  );

const round = () => {
  const player1Card = player1Deck.shift();
  const player2Card = player2Deck.shift();

  if (player1Card > player2Card) {
    player1Deck.push(player1Card, player2Card);
  } else {
    player2Deck.push(player2Card, player1Card);
  }
  if (player1Deck.length > 0 && player2Deck.length > 0) {
    round();
  }
};

round();

const winnerDeck = player1Deck.length !== 0 ? player1Deck : player2Deck;

const score = winnerDeck
  .map((v, i) => v * (winnerDeck.length - i))
  .reduce((acc, v) => acc + v);

console.log(score);
