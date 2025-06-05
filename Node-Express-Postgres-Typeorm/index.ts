import express from "express";
import bodyParser from "body-parser";
import UserRoutes from "./src/routes/user";
import "reflect-metadata"
import { AppDataSource } from "./src/data-source";

const app = express();
app.use(bodyParser.json());

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        console.log('connection established')
    })
    .catch((error) => console.log("error connection DB",error))



app.use("/user", UserRoutes);

app.listen(3000, () => console.log("app is running on", 3000));
