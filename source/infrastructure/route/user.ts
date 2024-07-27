import express from "express";
import { validatorRegisterUser, validatorUpdateUser, validatorDeleteUser, validatorGetUser } from '../middlewares/user'
import { validateToken } from '../middlewares/token'

import { UserController } from '../controller/user'
import { UserRepository } from "../repository/user";
import { PersonRepository } from "../repository/person";

import { UserUseCase } from "../../application/useCase/user.useCase";
import { PersonUseCase } from "../../application/useCase/person.useCase";


export const router = express.Router()

/**
 * Iniciar Repository
 */
const userRepo = new UserRepository()
const personRepo = new PersonRepository()


/**
 * Iniciamos casos de uso
 */

const userUseCase = new UserUseCase(userRepo)
const personUseCase = new PersonUseCase(personRepo)



const userController = new UserController(userUseCase, personUseCase)

router.get('/', validateToken, userController.list)
router.get('/:id', validateToken, validatorGetUser, userController.get)
router.post('/', validateToken, validatorRegisterUser, userController.register)
router.put('/:id', validateToken, validatorUpdateUser, userController.update)
router.delete('/:id', validateToken, validatorDeleteUser, userController.delete)
router.post('/pdf', validateToken, userController.pdf)




