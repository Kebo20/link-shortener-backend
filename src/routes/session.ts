import express from "express";
import { validatorLogin } from '../middlewares/session'
import { validateToken } from '../middlewares/token'

import { SessionController } from '../controllers/session'


export const router = express.Router()

const sessionController = new SessionController()

router.post('/login', validatorLogin, sessionController.login)
router.post('/logout', validateToken, sessionController.logout)


