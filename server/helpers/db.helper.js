import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
)

sequelize
    .sync({ alter: true })
    .then( () => { console.log('Database is now in sync...') })
    .catch( (err) => { console.log(`Synchornization was not done and the following error was caught:\n${err}`) })

const getErrorMessage = (receivedError) => {
    const errorMessages = {}
    for (let i = 0; i < Object.keys(receivedError).length; i++) {
        const path = receivedError.errors[i].path
        const msg = receivedError.errors[i].message
        errorMessages[path] = msg
    }
    return errorMessages
}

export {
    sequelize,
    getErrorMessage
}