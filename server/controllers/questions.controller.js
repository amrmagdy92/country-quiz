import { PrismaClient } from "@prisma/client"
import { validateRowID } from "../helper/validations.helper"

const prisma = new PrismaClient()

const getCountryAndCapitalByID = (rowID) => {
    return new Promise((resolve, reject) => {
        let validationErrors = validateRowID(parseInt(rowID))
        if (Object.keys(validationErrors).length > 0) {
            reject({
                code: 400,
                msg: "Invalid country id"
            })
        }
        prisma.capitals.findUnique({
            where: {
                id: parseInt(rowID)
            }
        }).then( row => {
            resolve({
                code: 200,
                msg: row
            })
        }).catch( err => {
            reject({
                code: 500,
                msg: err
            })
        })
    })
}
const tableMetaData = () => {
    return new Promise((resolve, reject) => {
        prisma.capitals.count()
        .then( count => {
            resolve({
                code: 200,
                msg: count
            })
        }).catch( err => {
            reject({
                code: 500,
                msg: err
            })
        })
    })
}

export {
    getCountryAndCapitalByID,
    tableMetaData
}