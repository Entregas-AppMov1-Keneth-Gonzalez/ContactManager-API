import "reflect-metadata"
import { DataSource } from "typeorm"
import { Contact } from "./entity/Contact"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "sql5.freemysqlhosting.net",
    port: 3306,
    username: "sql5747528",
    password: "IAQSef5B6s",
    database: "sql5747528",
    synchronize: true,
    logging: false,
    entities: [Contact],
    migrations: [],
    subscribers: [],
})
