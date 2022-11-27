require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.json());

app.use("/api/users", userRouter);
//const port = process.env.PORT || 4000;
app.listen( process.env.APP_PORT, () => {
  console.log("server up and running on Port 3000 :");
});