// fileManager.js
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`
Commands:
read <file>
write <file> <content>
copy <src> <dest>
delete <file>
list <dir>
exit
`);

rl.on("line", (input) => {
  const [cmd, ...args] = input.trim().split(" ");

  try {
    switch (cmd) {
      case "read":
        console.log(fs.readFileSync(args[0], "utf8"));
        break;

      case "write":
        fs.writeFileSync(args[0], args.slice(1).join(" "));
        console.log("File written");
        break;

      case "copy":
        fs.copyFileSync(args[0], args[1]);
        console.log("File copied");
        break;

      case "delete":
        fs.unlinkSync(args[0]);
        console.log("File deleted");
        break;

      case "list":
        fs.readdirSync(args[0]).forEach(f => console.log(f));
        break;

      case "exit":
        rl.close();
        break;

      default:
        console.log("Invalid command");
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
});