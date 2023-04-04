const express = require("express");
const messageController = require("../controllers/message.controller");
const auths = require("../middleware/auths")
const router = express.Router();


router.get('/hello', messageController.hello);

router.get('/privatehello', auths.checkJWT, messageController.privateHello);


module.exports = router;