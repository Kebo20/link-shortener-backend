import fs from "fs/promises";
import express from "express";
import { validatorShortUrl } from '../middlewares/link'

export const routerExpress = express.Router();


import { LinkRepository } from "../repository/link";

import { SequelizeRepository } from "../repository/sequelizeTransaction";
import { LinkController } from "../controller/link";
import { LinkService } from "../../application/service/link.service";
import { LinkUseCase } from "../../application/useCase/link.useCase";


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

routerExpress.get('/:shortUrl', validatorShortUrl, linkController.getByShortUrl)



