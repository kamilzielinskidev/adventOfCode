import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");
  const instructions = data.split("\n");
  const mapedInstructions = instructions.map((instruction) => {
    const [ins, val] = instruction.split(" ");
    return { instruction: ins, val: parseInt(val), executions: 0 };
  });

  const execute = (instructionIndex: number, acc: number) => {
    let { instruction, val, executions } = mapedInstructions[instructionIndex];
    if (executions === 1) {
      console.log("STOP");
      console.log(acc);
      return;
    }
    mapedInstructions[instructionIndex].executions += 1;
    switch (instruction) {
      case "acc":
        return execute(instructionIndex + 1, acc + val);
      case "jmp":
        return execute(instructionIndex + val, acc);
      case "nop":
        return execute(instructionIndex + 1, acc);
    }
  };

  execute(0, 0);
};

main();
