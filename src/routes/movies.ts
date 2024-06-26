import express from "express";
import { validatorFilter, validatorCreate, validatorUpdate } from '../middlewares/movie'
import { MovieController } from '../controllers/movie'
import { validateToken } from "../middlewares/token"

export const router = express.Router()

const movieController = new MovieController()

router.get('/', validateToken, validatorFilter, movieController.getAll)
router.post('/', validateToken, validatorCreate, movieController.create)
router.put('/:id', validateToken, validatorUpdate, movieController.update)

