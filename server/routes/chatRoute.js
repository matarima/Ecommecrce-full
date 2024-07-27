const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat");

router.post("/", chatController.createChat);

router.get("/:userId", chatController.findUserChat);

router.get("/:firstId/:secondId", chatController.findChat);

module.exports = router;