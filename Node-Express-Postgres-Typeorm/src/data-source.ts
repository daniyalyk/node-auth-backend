import { DataSource } from "typeorm";
import {User} from "./entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "auth-typeorm",
    synchronize:false,
    logging: true,
    entities: ["src/entity/*.ts"],
    subscribers: [],
    migrations: ["src/migration/*.ts"],
})

