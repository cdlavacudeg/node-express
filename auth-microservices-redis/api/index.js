const express = require("express");

const app = express();
const config = require("../config.js");

const user = require("./components/user/network");

//app.use(urlencoded({ extended: true }));
app.use(express.json());

//Router
app.use("/api/user", user);

app.listen(config.api.port, () => {
  console.log(`API escuchando en el puerto ${config.api.port}`);
});
