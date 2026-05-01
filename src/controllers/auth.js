"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const User = require("../models/user");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const CustomError = require("../helpers/customError");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get Token and JWT.'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */

    const { username, email, password } = req.body;

    if (!(username || email) && password)
      throw new CustomError("Please enter usurname/email and password.", 400);

    const user = await User.findOne({ $or: [{ email }, { username }] }).lean();

    if (!user) throw new CustomError("Wrong email/username or password.", 401);

    if (user.password !== passwordEncrypt(password))
      throw new CustomError("Wrong email/username or password.", 401);

    if (!user.isActive)
      throw new CustomError("This account is not active", 401);

    // Simple Token
    let tokenData = await Token.findOne({ userId: user._id });
    if (!tokenData) {
      tokenData = await Token.create({
        userId: user._id,
        token: passwordEncrypt(user._id + Date.now()),
      });
    }

    // Json Web Token
    const {
      _id,
      password: { userPass },
      ...accessPayload
    } = user;

    const access = jwt.sign({ _id, ...accessPayload }, process.env.ACCESS_KEY, {
      expiresIn: "30m",
    });
    const refresh = jwt.sign({ _id }, process.env.REFRESH_KEY, {
      expiresIn: "1d",
    });

    res.status(200).send({
      error: false,
      bearer: { access, refresh },
      token: tokenData.token,
      user,
    });
  },

  refresh: async (req, res) => {
    /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'JWT: Refresh'
            #swagger.description = 'Refresh access-token by refresh-token.'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    bearer: {
                        refresh: '___refreshToken___'
                    }
                }
            }
        */

    const { refresh } = req.body;

    if (!refresh) throw new CustomError("Refresh token is required.", 400);

    jwt.verify(
      refresh,
      process.env.REFRESH_KEY,
      async function (err, userData) {
        if (!userData) throw new CustomError(err.message, 400);

        const user = await User.findOne({ _id: userData._id });

        if (!user) throw new CustomError("Token data is broken.", 400);

        if (!user.isActive)
          throw new CustomError("This account is not active.", 401);

        const { _id, password, ...accessPayload } = user;
        const access = jwt.sign(
          { _id, ...accessPayload },
          process.env.ACCESS_KEY,
          { expiresIn: "30m" }
        );

        res.status(200).send({
          error: false,
          bearer: { access },
        });
      }
    );
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Token: Logout"
            #swagger.description = 'Delete token-key.'
        */

    const currentUserId = req.user._id;

    let result = currentUserId
      ? await Token.deleteOne({ userId: currentUserId })
      : null;

    res.status(200).send({
      error: false,
      message: result.deletedCount
        ? "User logout success and token deleted."
        : "User logout success You can delete token from your session.",
    });
  },
};
