import express from "express";
import { validatorLogin } from '../middlewares/session'
import { validateToken } from '../middlewares/token'

import { SessionController } from '../controller/session'
import { SessionRepository } from "../repository/session";
import { SessionUseCase } from "../../application/useCase/session.useCase";


export const router = express.Router()

/**
 * Iniciar Repository
 */
const sessionRepo = new SessionRepository()


/**
 * Iniciamos casos de uso
 */

const sessionUseCase = new SessionUseCase(sessionRepo)



const sessionController = new SessionController(sessionUseCase)

router.post('/login', validatorLogin, sessionController.login)
router.post('/logout', validateToken, sessionController.logout)





