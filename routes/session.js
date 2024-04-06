import express from "express";
import { validatorLogin } from '../middlewares/session.js'
import { validateToken } from '../middlewares/token.js'

import { SessionController } from '../controllers/session.js'


export const router = express.Router()

const sessionController = new SessionController()

router.post('/login', validatorLogin, sessionController.login)
router.post('/logout', validateToken, sessionController.logout)


