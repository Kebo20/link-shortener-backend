import { UserModel } from '../models/user.js'
import { PersonModel } from '../models/person.js'

import { sequelize } from '../config/db.js'
import { AccessTokenModel } from '../models/accessToken.js'
import { HttpError } from '../utils/handleError.js'
import bcrypt from 'bcrypt'

export class UserController {


    register = async (req, res, next) => {

        const transaction = await sequelize.transaction();

        try {

            const { userName, password, email, document, firstName, lastName, sex, phone, address, birthDate } = res.locals.body;
            const { idUser } = res.locals.tokenResponse


            const oUser = await UserModel.findOne({
                where: {
                    [sequelize.Sequelize.Op.or]: [
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


            const newPerson = await PersonModel.create(
                {
                    firstName,
                    lastName,
                    fullName: firstName + ' ' + lastName,
                    document,
                    sex,
                    address,
                    phone,
                    birthDate,
                    createdBy: idUser,
                },
                { transaction },

            )

            await UserModel.create(
                {
                    idUser: newPerson.idPerson,
                    userName,
                    password: await bcrypt.hash(password, 10),
                    email,
                    createdBy: idUser,
                },
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

    update = async (req, res, next) => {

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
                    [sequelize.Sequelize.Op.or]: [
                        { userName },
                        { email }
                    ],
                    idUser: { [sequelize.Sequelize.Op.not]: id },
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
                    idPerson: { [sequelize.Sequelize.Op.not]: id },
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
                    updateDate: new Date().toISOString()
                },
                {
                    where: { idPerson: id, status: 1 }
                },
                { transaction },

            )

            await UserModel.update(
                {
                    userName,
                    password: await bcrypt.hash(password, 10),
                    email,
                    updatedBy: idUser,
                    updateDate: new Date().toISOString(),

                },
                {
                    where: { idUser: id, status: 1 }
                },
                { transaction },

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

    delete = async (req, res, next) => {

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
                    deletionDate: new Date().toISOString()
                },
                {
                    where: { idPerson: id, status: 1 }
                },
                { transaction },

            )

            await UserModel.update(
                {
                    status: 0,
                    deletedBy: idUser,
                    deletionDate: new Date().toISOString()
                },
                {
                    where: { idUser: id, status: 1 }
                },
                { transaction },

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

    list = async (req, res, next) => {

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


                },
                { transaction },

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