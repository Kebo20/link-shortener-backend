import UserModel from '../model/user'
import PersonModel from '../model/person'
import { Op } from "sequelize";

import { sequelize, namespace } from '../db/mysql'
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

            const { userName, password, email, document, firstName, lastName, sex, phone, address, birthDate } = res.locals.body;
            const { idUser } = res.locals.tokenResponse

            await sequelize.transaction(async () => {

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

            await sequelize.transaction(async () => {

                const newDataPerson: PersonEntity = { idPerson: id, email, document, firstName, lastName, fullName: firstName + ' ' + lastName, sex, phone, address, birthDate, createdBy: idUser, creationDate: new Date(), updatedBy: idUser }
                await this.personUseCase.updatePerson(newDataPerson)

                const newDataUser: UserEntity = { idUser: id, userName, password: await bcrypt.hash(password, 10), email, createdBy: idUser, toChange: 0, status: 1, creationDate: new Date(), idGroup: 1, updatedBy: idUser }
                await this.userUseCase.updateUser(newDataUser)

            })

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

            await this.userUseCase.delete({ idUser: id, deletedBy: idUser })

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


        try {

            const listUsers = await this.userUseCase.list()
            res.json({ data: listUsers });

        } catch (error) {
            next(error);
        }



    }


    get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const transaction = await sequelize.transaction();

        try {

            const { id } = res.locals.body;

            const findUser = await this.userUseCase.findById(id)


            await transaction.commit();
            res.json({ data: findUser });

        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            next(error);
        }



    }


}