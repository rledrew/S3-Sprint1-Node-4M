////////////////////////////////////////////////
// imports
const fs = require("fs");
const crc32 = require("crc/crc32");
const { format, add, parseISO } = require("date-fns");

////////////////////////////////////////////////
// functions
var tokenCount = function () {
  if (global.DEBUG) console.log("token.tokenCount()");
  return new Promise((resolve, reject) => {
    fs.readFile("./json/tokens.json", async (err, data) => {
      if (err) reject(err);
      let tokens = await JSON.parse(data);
      console.log(`Current token count: ${tokens.length}`);
    });
  });
};

function tokenList() {
  if (global.DEBUG) console.log("token.tokenList()");
  fs.readFile("./json/tokens.json", async (err, data) => {
    if (err) throw err;
    let tokens = await JSON.parse(data);
    console.log("User List:");
    tokens.forEach((obj) => {
      console.log(" * " + obj.username + " : " + obj.token);
    });
    // myEmitter.emit("log", "token.tokenList", "INFO", "User List: " + tokens);
  });
}

async function newToken(...args) {
  if (global.DEBUG) console.log("token.newToken()");
  let date = format(new Date(), "y-MM-dd HH:mm.ss");
  let exp = add(parseISO(date), { days: 1 });
  let access = false;
  let tkn = crc32(`${access}#${date}#${exp}`).toString(36);
  console.log(args.length);
  if (args.length === 0) {
    tmpToken = {
      created: date,
      username: "null",
      password: "null",
      email: "null",
      phone: "null",
      token: tkn,
      expires: exp,
      confirmed: access,
    };
  }
  if (args.length === 1) {
    tmpToken = {
      created: date,
      username: args[0][0],
      password: args[0][1],
      email: "null",
      phone: "null",
      token: tkn,
      expires: exp,
      confirmed: access,
    };
  }
  if (args.length === 5) {
    tmpToken = {
      created: date,
      username: args[1],
      password: args[2],
      email: args[3],
      phone: args[4],
      token: tkn,
      expires: exp,
      confirmed: access,
    };
  }

  try {
    await fs.readFile("./json/tokens.json", async (error, data) => {
      if (error) console.log(error);
      let tokens = await JSON.parse(data);
      if (!Array.isArray(tokens)) {
        tokens = [];
      }
      tokens.push(tmpToken);
      await fs.writeFile(
        "./json/tokens.json",
        JSON.stringify(tokens),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Token saved successfully.");
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
}

async function updateToken(args) {
  if (global.DEBUG) console.log("token.updateToken()");
  if (global.DEBUG) console.log(args);
  fs.writeFile(
    "./json/tokens.json",
    JSON.stringify(await newToken(args)),
    async (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Tokens saved successfully.");
      }
    }
  );
}
function searchForUser(args) {
  if (global.DEBUG) console.log("token.searchForUser()");
  if (global.DEBUG) console.log(args);
  fs.readFile("./json/tokens.json", async (err, data) => {
    if (err) console.log(err);
    let tokens = await JSON.parse(data);
    tokens.forEach((token) => {
      if (args[3] === token.username) {
        console.log(token);
        return token;
      }
    });
  });
}

function searchForPhone(args) {
  if (global.DEBUG) console.log("token.searchForUser()");
  if (global.DEBUG) console.log(args);
  fs.readFile("./json/tokens.json", async (err, data) => {
    if (err) console.log(err);
    let tokens = await JSON.parse(data);
    tokens.forEach((token) => {
      if (args[3] === token.phone) {
        console.log(token);
      }
    });
  });
}

function searchForEmail(args) {
  if (global.DEBUG) console.log("token.searchForUser()");
  if (global.DEBUG) console.log(args);
  fs.readFile("./json/tokens.json", async (err, data) => {
    if (err) console.log(err);
    let tokens = await JSON.parse(data);
    tokens.forEach((token) => {
      if (args[3] === token.email) {
        console.log(token);
      }
    });
  });
}

////////////////////////////////////////////////
// Exports
module.exports = {
  newToken,
  tokenCount,
  tokenList,
  updateToken,
  searchForUser,
  searchForPhone,
  searchForEmail,
};
