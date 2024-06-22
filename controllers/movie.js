import { MovieModel } from '../models/movie.js'
import { HttpError } from '../utils/handleError.js'
import { DateTime } from 'luxon'
export class MovieController {
    // constructor({ movieModel }) {
    //     this.movieModel = movieModel
    // }

    getAll = async (req, res, next) => {

        try {

            const { genre } = res.locals.body
            const movies = await MovieModel.findAll({
                where: { genre, status: 1 },
            });

            const response = {
                message: 'OK',
                movies,
            };

            res.json(response);

        } catch (error) {
            next(error);
        }

    }

    create = async (req, res, next) => {

        try {

            const input = res.locals.body
            const { idUser } = res.locals.tokenResponse

            const data = { creationDate: DateTime.now(), userCreate: idUser, ...input }
            const newMovie = await MovieModel.create(data);


            res.status(201).json(newMovie);

        } catch (error) {
            next(error);
        }

    }

    update = async (req, res, next) => {

        try {

            const input = res.locals.body

            const { idUser } = res.locals.tokenResponse

            const data = { lastChangeDate: DateTime.now(), userLastChange: idUser, ...input }
            const updateMovie = await MovieModel.update(data, { where: { id: input.id, status: 1 } });

            if (updateMovie[0] === 1) {
                res.status(200).json({ message: "Actualizado correctamente" });

            } else {
                throw new HttpError({
                    code: 'BAD_REQUEST',
                    message: "No se pudo actualizar",
                });
            }

        } catch (error) {
            next(error);
        }

    }

}