const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { sendRequest } = require("../controllers/request/sendRequest");
const getRequest = require("../controllers/request/getRequest");
const updateRequest = require("../controllers/request/updateRequest");
const router = express.Router();

router.post("/", authMiddleware, sendRequest);
router.post("/getRequest", authMiddleware, getRequest);
router.patch("/:id/status", authMiddleware, updateRequest);

module.exports = router;
