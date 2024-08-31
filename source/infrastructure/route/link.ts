import express from "express";
import { validatorRegisterUser, validatorUpdateUser, validatorDeleteUser, validatorGetUser } from '../middlewares/user'
import { validatorPassword, validatorRegisterLink, validatorShortUrl } from '../middlewares/link'

import { validateToken } from '../middlewares/token'
import { validateTokenRecaptcha } from '../middlewares/recaptchaV3'

import { validatorPermissions } from '../middlewares/authorization'


import { LinkRepository } from "../repository/link";

import { SequelizeRepository } from "../repository/sequelizeTransaction";
import { LinkController } from "../controller/link";
import { LinkService } from "../../application/service/link.service";
import { LinkUseCase } from "../../application/useCase/link.useCase";


export const router = express.Router()

/**
 * Iniciar Repository
 */
const linkRepo = new LinkRepository()
const sequelizeRepository = new SequelizeRepository()

/**
 * Iniciamos casos de uso
 */

const linkUseCase = new LinkUseCase(linkRepo)

/**
 * Iniciamos Services
 */

const userService = new LinkService(linkUseCase, sequelizeRepository)


const linkController = new LinkController(userService)

// router.get('/', validateToken, validatorPermissions('user'), linkController.list)
// router.post('/:id', validateTokenRecaptcha, validatorGetUser, linkController.get)
router.post('/validate/:shortUrl', validateTokenRecaptcha, validatorShortUrl, linkController.validateShortUrl)
router.post('/', validateTokenRecaptcha, validatorRegisterLink, linkController.register)
router.post('/validate-password', validateTokenRecaptcha, validatorPassword, linkController.validatePassword)

// router.put('/:id', validateToken, validatorPermissions('user'), validatorUpdateUser, linkController.update)
// router.delete('/:id', validateToken, validatorPermissions('user'), validatorDeleteUser, linkController.delete)




