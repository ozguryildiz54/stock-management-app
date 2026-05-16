"use strict";
const router = require("express").Router();
const { list, create, read, update, dlt } = require("../controllers/brand");
const { isLogin, isAdmin, isStaff } = require("../middlewares/permissions");
/* ------------------------------------------------------- */

// URL -> /brands

router.use(isLogin);

router.route("/").get(list).post(isAdmin, create);
router.route("/:id").get(read).put(isStaff, update).delete(isAdmin, dlt);

module.exports = router;
