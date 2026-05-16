"use strict";
const router = require("express").Router();
const { list, create, read, update, dlt } = require("../controllers/sale");
const { isLogin, isAdmin, isStaff } = require("../middlewares/permissions");

/* ------------------------------------------------------- */

// URL -> /sales

router.use(isLogin);

router.route("/").get(list).post(isStaff, create);
router.route("/:id").get(read).put(isAdmin, update).delete(isAdmin, dlt);

module.exports = router;
