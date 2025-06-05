import express from "express";
import bodyParser from "body-parser";
import './db'
import UserRoutes from "./routes/user";
import SubjectRoutes from "./routes/subjects";

const app = express();
app.use(bodyParser.json());

app.use("/user", UserRoutes);
app.use("/subjects", SubjectRoutes);

app.listen(3000, () => console.log("app is running on", 3000));
