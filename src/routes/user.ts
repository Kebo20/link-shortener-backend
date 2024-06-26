import express from "express";
import { validatorRegisterUser, validatorUpdateUser, validatorDeleteUser } from '../middlewares/user'
import { validateToken } from '../middlewares/token'

import { UserController } from '../controllers/user'


export const router = express.Router()

const userController = new UserController()

router.get('/', validateToken, userController.list)
router.post('/', validateToken, validatorRegisterUser, userController.register)
router.put('/:id', validateToken, validatorUpdateUser, userController.update)
router.delete('/:id', validateToken, validatorDeleteUser, userController.delete)




