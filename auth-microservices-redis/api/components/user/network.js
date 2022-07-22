const express = require("express");
const secure = require("./secure");
const response = require("../../../network/response");
const router = express.Router();
const Controller = require("./index");
//Routes
router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.put("/", secure("update"), upsert);

// Internal functions
function list(req, res, next) {
  Controller.list()
    .then((list) => {
      response.succes(req, res, list, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((user) => {
      response.succes(req, res, user, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  Controller.upsert(req.body)
    .then((user) => {
      response.succes(req, res, user, 201);
    })
    .catch(next);
}
module.exports = router;
