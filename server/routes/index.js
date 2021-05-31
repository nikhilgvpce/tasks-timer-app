/**
 * this file has routes for all the apis used
 */

const express = require('express')

const timerRoute = require('./../controllers/timer-controller.js')

const router = express.Router()

router.get('/allTasks', timerRoute.allTasks)

router.post('/createTask', timerRoute.createTask)

router.post('/createUser', timerRoute.createUser)



module.exports = router