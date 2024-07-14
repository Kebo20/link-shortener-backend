import { UserAttributes } from '../interfaces/user';
import UserModel from '../models/user'
import { Op, Transaction } from 'sequelize';
import { HttpError } from '../utils/handleError'


export class UserService {


    static existByEmailOrUsername = async ({ userName, email }: { userName: string; email: string }): Promise<number> => {


        try {
            const oUser = await UserModel.count({
                where: {
                    [Op.or]: [
                        { userName },
                        { email }
                    ],
                    status: 1,
                },
            });

            // if (oUser) {
            //     throw new HttpError({
            //         code: 'BAD_REQUEST',
            //         message: 'Usuario ya registrado',
            //     });
            // }
            if (oUser > 0) {
                throw new HttpError({
                    code: 'BAD_REQUEST',
                    message: 'Usuario ya registrado..',
                });
            }

            return oUser

        } catch (error) {
            throw new Error('Usuario ya registrado');
        }
    }

    static createUser = async (data: UserAttributes, transaction: Transaction): Promise<UserModel> => {

        const oUser = await UserModel.create(data, { transaction })

        return oUser

    }

}