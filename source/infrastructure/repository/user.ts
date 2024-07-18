// import { UserAttributes } from '../interfaces/user';
import { Op, Transaction } from 'sequelize';
import { HttpError } from '../utils/handleError'
import { UserRepositoryI } from '../../domain/repository/user.repository'
import { PersonEntity } from '../../domain/entity/person.entity';
import { UserEntity } from '../../domain/entity/user.entity';
import UserModel from "../model/user";



export class UserRepository implements UserRepositoryI {
    async findEmailOrUsername({ userName, email }: { userName: string; email: string; }): Promise<number> {
        // try {
        const oUser = await UserModel.count({
            where: {
                [Op.or]: [
                    { userName },
                    { email }
                ],
                status: 1,
            },
        });


        // if (oUser > 0) {
        //     throw new HttpError({
        //         code: 'BAD_REQUEST',
        //         message: 'Usuario ya registrado.',
        //     });
        // }

        return oUser

        // } catch (error: any) {
        //     if (error instanceof HttpError) {
        //         throw error; // Si el error es de tipo HttpError, lo relanzamos
        //     } else {
        //         throw new Error(String(error)); // Convertimos a string el error desconocido y lo lanzamos
        //     }
        // }
    }
    async register(userEntity: UserEntity): Promise<UserEntity> {
        const oUser = await UserModel.create(userEntity)
        return oUser
    }
    update({ userEntity, personEntity }: { userEntity: UserEntity; personEntity: PersonEntity; }): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }
    delete(idUser: string): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }
    list(): Promise<UserEntity[]> {
        throw new Error('Method not implemented.');
    }


}