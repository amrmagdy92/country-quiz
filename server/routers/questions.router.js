import { Router } from "express"

import { initiateVariables, getCountryAndCapitalByID } from "../controllers/questions.controller"

const router = Router()

router.route("/")
    .get((request, response) => {
        initiateVariables()
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
            response.status(result.code).render('index.ejs', {
                question: {
                    country: result.msg.country
                }
            })
        })
        .catch( err => {
            response.status(err.code).json({ msg: err.msg })
        })
    })
    .post((request, response) => {
        // render button
    })

export default router