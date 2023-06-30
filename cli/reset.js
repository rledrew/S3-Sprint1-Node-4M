const fs = require("fs");

const resetApp = async () => {
  console.log("Resetting...");
  if (fs.existsSync("./src/logs")) {
    console.log("Logs directory exists.");
  } else {
    fs.mkdirSync("./src/logs");
    console.log("./src/logs created");
  }
  if (fs.existsSync("./json")) {
    console.log("Json directory exists.");
  } else {
    fs.mkdirSync("./json");
    console.log("./json created");
  }
  fs.writeFileSync("./json/tokens.json", "{}");
  fs.writeFileSync("./json/users.json", "{}");
  fs.writeFileSync("./json/config.json", "{}");
  console.log("./json/tokens.json reset");
  console.log("./json/config.json reset");
  console.log("./json/users.json reset");
  console.log("Reset complete.");
};

module.exports = { resetApp };
