import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usuario } from "../../app/entity/Usuario"
import {CreateUsuarios1706292600178 } from "./migrations/1706292600178-CreateUsers"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin001nea11",
    database: "teste",
    synchronize: true,
    logging: false,
    entities: [Usuario],
    migrations: [CreateUsuarios1706292600178],
    subscribers: [],
})
