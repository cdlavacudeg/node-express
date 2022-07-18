const express = require("express");
const response = require("../../../network/response");
const router = express.Router();
const controller = require("./controller");

router.get("/", (req, res) => {
  const list = controller.list();
  response.succes(req, res, list, 200);
});

module.exports = router;
