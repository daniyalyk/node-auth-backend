import express from "express";
import mongoose  from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/auth")
  .then(() => console.log("connect"))
  .catch((err) => console.log("err", err));

import bodyParser from "body-parser";
import UserRoutes from "./routes/user";

const app = express();
app.use(bodyParser.json());

app.use("/user", UserRoutes);

app.listen(3000, () => console.log("app is running on", 3000));
