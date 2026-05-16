"use strict";
const router = require("express").Router();
const { list, create, read, update, dlt } = require("../controllers/category");
const { isLogin, isAdmin, isStaff } = require("../middlewares/permissions");
/* ------------------------------------------------------- */

// URL -> /categories

router.use(isLogin);

router.route("/").get(list).post(isAdmin, create);
router.route("/:id").get(read).put(isAdmin, update).delete(isAdmin, dlt);

module.exports = router;
