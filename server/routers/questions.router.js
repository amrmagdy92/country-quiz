import { Router } from "express"

import { tableMetaData, getCountryAndCapitalByID } from "../controllers/questions.controller"

const router = Router()

router.route("/")
    .get((request, response) => {
        tableMetaData()
        .then( result => {
            response.status(result.code).json({ msg: result.msg })
        })
        .catch( err => {
            response.status(err.code).json({ msg: err.msg })
        })
    })

router.route("/capital")
    .get((request, response) => {
        getCountryAndCapitalByID(request.query.country_id)
        .then( result => {
            response.status(result.code).json({ msg: result.msg })
        })
        .catch( err => {
            response.status(err.code).json({ msg: err.msg })
        })
    })

export default router