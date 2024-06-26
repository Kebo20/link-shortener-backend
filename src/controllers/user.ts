import UserModel from '../models/user'
import PersonModel from '../models/person'
import { Op } from "sequelize";

import { sequelize } from '../config/db'
import AccessTokenModel from '../models/accessToken'
import { HttpError } from '../utils/handleError'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from "express";
import { UserAttributes } from '../interfaces/user';
import { PersonAttributes } from '../interfaces/person';

export class UserController {


    register = async (req: Request, res: Response, next: NextFunction) => {

        const transaction = await sequelize.transaction();

        try {

            const { userName, password, email, document, firstName, lastName, sex, phone, address, birthDate } = res.locals.body;

            const { idUser } = res.locals.tokenResponse


            const oUser = await UserModel.findOne({
                where: {
                    [Op.or]: [
                        { userName },
                        { email }
                    ],
                    status: 1,
                },
            });
            if (oUser) {
                throw new HttpError({
                    code: 'BAD_REQUEST',
                    message: 'Usuario ya registrado',
                });
            }

            const oPerson = await PersonModel.findOne({
                where: {
                    document: document,
                    status: 1,
                },
            });
            if (oPerson) {
                throw new HttpError({
                    code: 'BAD_REQUEST',
                    message: 'Documento ya registrado',
                });
            }


            const newDataPerson: PersonAttributes = { email, document, firstName, lastName, fullName: firstName + ' ' + lastName, sex, phone, address, birthDate, createdBy: idUser, status: 1, creationDate: new Date() }
            const newPerson = await PersonModel.create(newDataPerson, { transaction })

            const newDataUser: UserAttributes = { idUser: newPerson.idPerson, userName, password: await bcrypt.hash(password, 10), email, createdBy: idUser, toChange: 0, status: 1, creationDate: new Date() }

            await UserModel.create(
                newDataUser,
                { transaction },

            )

            await transaction.commit();
            res.json({ message: 'Usuario registrado correctamente ' });

        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            next(error);
        }



    }

    update = async (req: Request, res: Response, next: NextFunction) => {

        const transaction = await sequelize.transaction();

        try {

            const { id, userName, password, email, document, firstName, lastName, sex, phone, address, birthDate } = res.locals.body;
            const { idUser } = res.locals.tokenResponse

            const oPersonValidate = await PersonModel.findOne({
                where: {
                    idPerson: id,
                    status: 1,

                },
            })

            const oUserValidate = await UserModel.findOne({
                where: {
                    idUser: id,
                    status: 1,
                },
            });
            if (!oUserValidate || !oPersonValidate) {
                throw new HttpError({
                    code: 'BAD_REQUEST',
                    message: 'Usuario no existe',
                });
            }

            const oUser = await UserModel.findOne({
                where: {
                    [Op.or]: [
                        { userName },
                        { email }
                    ],
                    idUser: { [Op.not]: id },
                    status: 1,
                },
            });
            if (oUser) {
                throw new HttpError({
                    code: 'BAD_REQUEST',
                    message: 'Usuario o correo ya registrado',
                });
            }

            const oPerson = await PersonModel.findOne({
                where: {
                    document: document,
                    status: 1,
                    idPerson: { [Op.not]: id },
                },
            });
            if (oPerson) {
                throw new HttpError({
                    code: 'BAD_REQUEST',
                    message: 'Documento ya registrado',
                });
            }


            await PersonModel.update(
                {
                    firstName,
                    lastName,
                    fullName: firstName + ' ' + lastName,
                    document,
                    sex,
                    address,
                    phone,
                    birthDate,
                    updatedBy: idUser,
                    updateDate: new Date()
                },
                {
                    where: { idPerson: id, status: 1 },
                    transaction
                },

            )

            await UserModel.update(
                {
                    userName,
                    password: await bcrypt.hash(password, 10),
                    email,
                    updatedBy: idUser,
                    updateDate: new Date(),

                },
                {
                    where: { idUser: id, status: 1 },
                    transaction
                },

            )


            await transaction.commit();
            res.json({ message: 'Usuario actualizado correctamente ' });

        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            next(error);
        }



    }

    delete = async (req: Request, res: Response, next: NextFunction) => {

        const transaction = await sequelize.transaction();

        try {

            const { id } = res.locals.body;
            const { idUser } = res.locals.tokenResponse

            const oPersonValidate = await PersonModel.findOne({
                where: {
                    idPerson: id,
                    status: 1,

                },
            })

            const oUserValidate = await UserModel.findOne({
                where: {
                    idUser: id,
                    status: 1,
                },
            });
            if (!oUserValidate || !oPersonValidate) {
                throw new HttpError({
                    code: 'BAD_REQUEST',
                    message: 'Usuario no existe',
                });
            }

            await PersonModel.update(
                {
                    status: 0,
                    deletedBy: idUser,
                    deletionDate: new Date()
                },
                {
                    where: { idPerson: id, status: 1 },
                    transaction
                },

            )

            await UserModel.update(
                {
                    status: 0,
                    deletedBy: idUser,
                    deletionDate: new Date()
                },
                {
                    where: { idUser: id, status: 1 },
                    transaction
                },

            )


            await transaction.commit();
            res.json({ message: 'Usuario eliminado correctamente ' });

        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            next(error);
        }



    }

    list = async (req: Request, res: Response, next: NextFunction) => {

        const transaction = await sequelize.transaction();

        try {




            const listUsers = await UserModel.findAll(
                {
                    include: {
                        model: PersonModel,
                        // as: 'person',
                        attributes: ['firstName', 'lastName', 'birthDate', 'fullName', 'address', 'phone',
                            [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('birthDate'), '%d/%m/%Y'), 'birthDateFormat']],
                    },

                    attributes: ['userName', 'email'],
                    // raw: true,// Devuelve los resultados como objetos JSON planos

                    transaction

                },

            )


            await transaction.commit();
            res.json({ data: listUsers });

        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            next(error);
        }



    }

}