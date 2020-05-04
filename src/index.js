const express = require("express");
const app = express();

// * Settings
app.set("port", process.env.PORT || 3000);

// * Middlewares
app.use(express.json());

// * Routes
app.use(require("./Routes/employess"));

// TODO Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port: 3000");
});
