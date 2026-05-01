"use strict";
/* -------------------------------------------------------
| FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// app.use(authentication):
const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const CustomError = require("../helpers/customError");

module.exports = async (req, res, next) => {
  req.user = null;

  const auth = req.headers?.authorization || null;
  const tokenArr = auth ? auth.split(" ") : null;

  if (tokenArr) {
    if (tokenArr[0] == "Token") {
      const { userId } = await Token.findOne({ token: tokenArr[1] }).populate(
        "userId"
      );
      req.user = userId ? userId : null;
    } else if (tokenArr[0] == "Bearer") {
      jwt.verify(
        tokenArr[1],
        process.env.ACCESS_KEY,
        (err, userData) =>
          (req.user = userData
            ? userData
            : next(new CustomError(err.message, 401)))
      );
    }
  }

  next();
};
