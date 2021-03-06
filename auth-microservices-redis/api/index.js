const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

const app = express();
const config = require("../config.js");

const user = require("./components/user/network");
const auth = require("./components/auth/network");
const errors = require("../network/errors.js");
//app.use(urlencoded({ extended: true }));
app.use(express.json());

//Router
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/user", user);
app.use("/api/auth", auth);

app.use(errors);
app.listen(config.api.port, () => {
  console.log(`API escuchando en el puerto ${config.api.port}`);
});
