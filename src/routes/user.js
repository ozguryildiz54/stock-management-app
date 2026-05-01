"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
const { list, create, read, update, dlt } = require("../controllers/user");
const { isLogin, isAdmin, isStaff } = require("../middlewares/permissions");

/* ------------------------------------------------------- */

// URL -> /users
router.route("/").get(isLogin, list).post(create);
router
  .route("/:id")
  .get(isLogin, read)
  .put(isLogin, update)
  .delete(isAdmin, dlt);

module.exports = router;
