import { Sequelize } from "sequelize"

const initiateDatabase = (dbHost, dbDialect, dbName, dbUser, dbPass) => {
    return new Sequelize({
        host: dbHost,
        dialect: dbDialect,
        database: dbName,
        username: dbUser,
        password: dbPass
    })
}

export default initiateDatabase