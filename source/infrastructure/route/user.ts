import express from "express";
import { validatorRegisterUser, validatorUpdateUser, validatorDeleteUser } from '../middlewares/user'
import { validateToken } from '../middlewares/token'

import { UserController } from '../controller/user'
import { UserRepository } from "../repository/user";
import { PersonRepository } from "../repository/person";

import { UserUseCase } from "../../application/useCase/user.caseUse";
import { PersonUseCase } from "../../application/useCase/person.caseUse";


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

// router.get('/', userController.list)
router.post('/', validatorRegisterUser, userController.register)
// router.put('/:id', validatorUpdateUser, userController.update)
// router.delete('/:id', validatorDeleteUser, userController.delete)




