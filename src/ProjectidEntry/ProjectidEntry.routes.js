const express = require("express");
const { getProjectIdEntry, postProjectIdEntry } = require("./ProjectidEntry.controller");
const { authenticateJWT } = require("../auth/Auth.jwt");

const router = express.Router()

router.get("/getProjectidEntry/:id", getProjectIdEntry)
router.post("/postProjectidEntry", postProjectIdEntry )

module.exports = router