import express from "express";
import { validatorRegisterUser, validatorUpdateUser, validatorDeleteUser, validatorGetUser } from '../middlewares/user'
import { validateToken } from '../middlewares/token'
import { validatorPermissions } from '../middlewares/authorization'


import { UserController } from '../controller/user'
import { UserRepository } from "../repository/user";
import { PersonRepository } from "../repository/person";

import { UserUseCase } from "../../application/useCase/user.useCase";
import { PersonUseCase } from "../../application/useCase/person.useCase";
import { SequelizeRepository } from "../repository/sequelizeTransaction";
import { UserService } from "../../application/service/user.service";


export const router = express.Router()

/**
 * Iniciar Repository
 */
const userRepo = new UserRepository()
const personRepo = new PersonRepository()
const sequelizeRepository = new SequelizeRepository()

/**
 * Iniciamos casos de uso
 */

const userUseCase = new UserUseCase(userRepo)
const personUseCase = new PersonUseCase(personRepo)

/**
 * Iniciamos Services
 */

const userService = new UserService(userUseCase, personUseCase, sequelizeRepository)


const userController = new UserController(userService)

router.get('/', validateToken, validatorPermissions('user'), userController.list)
router.get('/:id', validateToken, validatorPermissions('user'), validatorGetUser, userController.get)
router.post('/', validateToken, validatorPermissions('user'), validatorRegisterUser, userController.register)
router.put('/:id', validateToken, validatorPermissions('user'), validatorUpdateUser, userController.update)
router.delete('/:id', validateToken, validatorPermissions('user'), validatorDeleteUser, userController.delete)
router.post('/pdf', validateToken, validatorPermissions('user'), userController.pdf)




