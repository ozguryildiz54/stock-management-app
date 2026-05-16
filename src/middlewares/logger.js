"use strict";
// $ npm i morgan
// app.use(logger):

const morgan = require("morgan");
const fs = require("node:fs");
const path = require("node:path");

const now = new Date();
const today = now.toISOString().split("T")[0];

const isServerless = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

if (isServerless) {
  module.exports = morgan("combined");
} else {
  const rootDirectory = path.resolve(__dirname, "../..");
  const logDirectory = path.join(rootDirectory, "logs");

  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
  }

  const logStream = fs.createWriteStream(
    path.join(logDirectory, `${today}.log`),
    { flags: "a+" },
  );

  module.exports = morgan("combined", { stream: logStream });
}
