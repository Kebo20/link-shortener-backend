import UserModel from '../model/user'
import PersonModel from '../model/person'
import { Op } from "sequelize";

import { sequelize } from '../db/mysql'
import { HttpError } from '../utils/handleError'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from "express";
import { UserUseCase } from '../../application/useCase/user.caseUse';
import { PersonUseCase } from '../../application/useCase/person.caseUse';
import { PersonEntity } from '../../domain/entity/person.entity';
import { UserEntity } from '../../domain/entity/user.entity';
// import { UserAttributes } from '../interfaces/user';
// import { PersonAttributes } from '../interfaces/person';
// import { UserService } from '../services/user';
// import { PersonService } from '../services/person';

export class UserController {

    constructor(private userUseCase: UserUseCase, private personUseCase: PersonUseCase) {
    }


    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const transaction = await sequelize.transaction();

        try {

            // const { userName, password, email, document, firstName, lastName, sex, phone, address, birthDate } = res.locals.body;
            const { userName, password, email, document, firstName, lastName, sex, phone, address, birthDate } = req.body;


            // const { idUser } = res.locals.tokenResponse

            const idUser = '1'

            await sequelize.transaction(async () => {

                await this.userUseCase.findEmailOrUsername({ userName, email })
                await this.personUseCase.existByDocument(document)


                const newDataPerson: PersonEntity = { email, document, firstName, lastName, fullName: firstName + ' ' + lastName, sex, phone, address, birthDate, createdBy: idUser, creationDate: new Date() }
                const newPerson = await this.personUseCase.registerPerson(newDataPerson)

                const newDataUser: UserEntity = { idUser: newPerson.idPerson!, userName, password: await bcrypt.hash(password, 10), email, createdBy: idUser, toChange: 0, status: 1, creationDate: new Date(), idGroup: 1 }
                await this.userUseCase.registerUser(newDataUser)
            })


            await transaction.commit();
            res.json({ message: 'Usuario registrado correctamente ' });

        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            next(error);
        }



    }

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const transaction = await sequelize.transaction();

        try {

            const { id, userName, password, email, document, firstName, lastName, sex, phone, address, birthDate } = res.locals.body;
            const { idUser } = res.locals.tokenResponse

            const oPersonValidate = await PersonModel.findOne({
                where: {
                    idPerson: id,
                    // status: 1,

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
                    // status: 1,
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
                    where: {
                        idPerson: id,
                        // status: 1
                    },
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

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const transaction = await sequelize.transaction();

        try {

            const { id } = res.locals.body;
            const { idUser } = res.locals.tokenResponse

            const oPersonValidate = await PersonModel.findOne({
                where: {
                    idPerson: id,
                    // status: 1,

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

            // await PersonModel.update(
            //     {
            //         status: 0,
            //         deletedBy: idUser,
            //         deletionDate: new Date()
            //     },
            //     {
            //         where: { idPerson: id, status: 1 },
            //         transaction
            //     },

            // )

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

    list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

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