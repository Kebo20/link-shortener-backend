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
import { SessionRepositoryI } from '../../domain/repository/session.repository';
import { AccessTokenEntity } from '../../domain/entity/accessToken.entity';
import { SessionLoginEntity } from '../../domain/entity/session.entity';
import bcrypt from 'bcrypt'
import AccessTokenModel from '../model/accessToken';
import jwt from 'jsonwebtoken'



export class SessionRepository implements SessionRepositoryI {
    async getUserByCredentials(data: SessionLoginEntity): Promise<UserEntity | null> {

        const { email, password } = data

        const user = await UserModel.findOne({
            where: {
                email: email,
                status: 1,
            },
        });
        if (!user) return null

        const correct = await bcrypt.compare(password, user.password);
        if (!correct) return null

        return user
    }
    async validateSimultaneousSessions({ idUser, sessionPermited }: { idUser: string; sessionPermited: number; }): Promise<boolean> {

        const count = await AccessTokenModel.count({
            where: { idUser: idUser, revoked: 0 },
        });

        return sessionPermited > count

    }
    async validateExpiredPassword({ user, expirationMinutes }: { user: UserEntity; expirationMinutes: number; }): Promise<boolean> {
        if (user.reset === 1) {


            const now = new Date();

            if (!user.lastChangePassword) {
                return false
            } else {

                const dateChangePassword = user.lastChangePassword
                dateChangePassword.setMinutes(dateChangePassword.getMinutes() + expirationMinutes)
                return dateChangePassword > now
            }


        } else {
            return true
        }
    }
    async registerToken(data: UserEntity): Promise<AccessTokenEntity> {

        const jsonSign = {
            idUser: data.idUser,
            userName: data.userName,
            idGroup: data.idGroup,
        };
        const JWT_SECRET = process.env.TOKEN_JWT || "kebo24";

        const token = jwt.sign(jsonSign, JWT_SECRET, { expiresIn: '7d' });

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 7);
        let expiresAt = currentDate;

        const accessTokenEntity: AccessTokenEntity = {
            idUser: data.idUser,
            token,
            created_at: new Date(),
            updated_at: new Date(),
            expires_at: expiresAt,
            revoked: 0
        }
        const newToken = await AccessTokenModel.create(accessTokenEntity);

        return newToken
    }
    async revokedToken(token: string): Promise<void> {

        await AccessTokenModel.update({ revoked: 1 }, { where: { token: token } });

    }



}