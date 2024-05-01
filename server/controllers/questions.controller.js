import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getCountryAndCapitalByID = (rowID) => {
    return new Promise((resolve, reject) => {
        prisma.capitals.findUnique({
            where: {
                id: rowID
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