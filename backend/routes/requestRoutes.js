const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { sendRequest } = require("../controllers/request/sendRequest");
const getRequest = require("../controllers/request/getRequest");
const updateRequest = require("../controllers/request/updateRequest");
const getSentRequests = require("../controllers/request/myRequests/getSentRequests");
const getReceivedRequests = require("../controllers/request/myRequests/getReceivedRequests");
const router = express.Router();

router.post("/", authMiddleware, sendRequest);
router.post("/getRequest", authMiddleware, getRequest);
router.patch("/:id/status", authMiddleware, updateRequest);

router.get("/sent", authMiddleware, getSentRequests);
router.get("/recieved", authMiddleware, getReceivedRequests);

module.exports = router;
