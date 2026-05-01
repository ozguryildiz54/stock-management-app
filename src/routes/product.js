"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
const { list, create, read, update, dlt } = require("../controllers/product");
const { isLogin, isAdmin, isStaff } = require("../middlewares/permissions");

/* ------------------------------------------------------- */

// URL -> /products
router.use(isLogin);

router.route("/").get(list).post(isStaff, create);
router.route("/:id").get(read).put(isStaff, update).delete(isAdmin, dlt);

module.exports = router;
