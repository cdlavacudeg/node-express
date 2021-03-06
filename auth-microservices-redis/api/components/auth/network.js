const express = require("express");
const response = require("../../../network/response");
const router = express.Router();
const Controller = require("./index");

router.post("/login", function (req, res, next) {
  Controller.login(req.body.username, req.body.password)
    .then((token) => {
      response.succes(req, res, token, 200);
    })
    .catch(next);
});

module.exports = router;
