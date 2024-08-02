// import { UserAttributes } from '../interfaces/user';
import { Op, Transaction } from 'sequelize';
import { sequelize } from '../db/mysql';

import { HttpError } from '../utils/handleError'
import { UserRepositoryI } from '../../domain/repository/user.repository'
import { PersonEntity } from '../../domain/entity/person.entity';
import { UserEntity } from '../../domain/entity/user.entity';
import UserModel from "../model/user";
import PersonModel from "../model/person";
import { UserPersonList } from '../../domain/entity/userPerson.entity';



export class UserRepository implements UserRepositoryI {
    async findById(id: string): Promise<UserPersonList | null> {
        const user = await UserModel.findOne({
            include: [{
                model: PersonModel,
                attributes: ['firstName', 'lastName', 'sex', 'address', 'document', 'phone', 'birthDate'],
            }],
            attributes: ['idUser', 'email', 'userName',],
            where: { status: 1, idUser: id }
        });

        if (!user) return null
        return {
            id: user.idUser,
            email: user.email,
            userName: user.userName,
            firstName: user.person?.firstName || '',
            lastName: user.person?.lastName || '',
            fullName: (user.person?.firstName || '') + (user.person?.lastName || ''),
            sex: user.person?.sex || '',
            document: user.person?.document || '',
            phone: user.person?.phone || '',
            address: user.person?.address || '',
            birthDateFormat: user.person?.birthDate ? user.person.getFormattedBirthDate() : '',

        };
    }
    async findEmailOrUsername({ userName, email }: { userName: string; email: string; }): Promise<UserEntity | null> {
        const oUser = await UserModel.findOne({
            where: {
                [Op.or]: [
                    { userName },
                    { email }
                ],
                status: 1,

            },
        });



        return oUser
    }
    async register(userEntity: UserEntity): Promise<UserEntity> {
        const oUser = await UserModel.create(userEntity)
        return oUser
    }
    async update(UserEntity: UserEntity): Promise<number> {
        const updateUser = await UserModel.update(UserEntity, {
            where: {
                idUser: UserEntity.idUser,
            }
        },)
        return updateUser[0]
    }
    async delete({ idUser, deletedBy }: { idUser: string, deletedBy: string }): Promise<number> {
        const updateUser = await UserModel.update(
            { status: 0, deletedBy, deletionDate: new Date() },
            {
                where: {
                    idUser,
                }
            },)
        return updateUser[0]
    }
    async list(): Promise<UserPersonList[]> {

        // const listUsers = await UserModel.findAll(
        //     {
        //         include: {
        //             model: PersonModel,
        //             // as: 'person',
        //             attributes: ['firstName', 'lastName', 'birthDate', 'fullName', 'address', 'phone',
        //                 [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('birthDate'), '%d/%m/%Y'), 'birthDateFormat']],
        //         },

        //         attributes: ['userName', 'email'],
        //         // raw: true,// Devuelve los resultados como objetos JSON planos

        //         transaction

        //     },

        // )

        const users = await UserModel.findAll({
            include: [{
                model: PersonModel,
                attributes: ['firstName', 'lastName', 'sex', 'address', 'document', 'phone', 'birthDate'],
            }],
            attributes: ['idUser', 'email', 'userName',],
            where: { status: 1 }
        });

        return users.map(user => ({
            id: user.idUser,
            email: user.email,
            userName: user.userName,
            firstName: user.person?.firstName || '',
            lastName: user.person?.lastName || '',
            fullName: (user.person?.firstName || '') + (user.person?.lastName || ''),
            sex: user.person?.sex || '',
            document: user.person?.document || '',
            phone: user.person?.phone || '',
            address: user.person?.address || '',
            birthDateFormat: user.person?.birthDate ? user.person.getFormattedBirthDate() : '',

        }));
    }


}