import { UserAttributes } from '../interfaces/user';
import UserModel from '../models/user'
import { Op, Transaction } from "sequelize";
import { HttpError } from '../utils/handleError'


export class UserService {


    static existByEmailOrUsername = async ({ userName, email }: { userName: string; email: string }): Promise<boolean> => {


        try {
            const oUser = await UserModel.findOne({
                where: {
                    [Op.or]: [
                        { userName },
                        { email }
                    ],
                    status: 1,
                },
            });

            return !!oUser

        } catch (error) {

            return false
        }
    }

    static createUser = async (data: UserAttributes, transaction: Transaction): Promise<UserModel> => {

        const oUser = await UserModel.create(data, { transaction })

        return oUser

    }

}