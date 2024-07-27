import UserModel from '../model/user'
import AccessTokenModel from '../model/accessToken'
import { HttpError } from '../utils/handleError'
import { DateTime } from 'luxon'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import { AccessTokenEntity } from '../../domain/entity/accessToken.entity'
import { sequelize, namespace } from '../db/mysql'
import { SessionUseCase } from '../../application/useCase/session.useCase'
import { SessionLoginEntity } from '../../domain/entity/session.entity'


export class SessionController {

    constructor(private sessionUseCase: SessionUseCase) {
    }


    login = async (req: Request, res: Response, next: NextFunction) => {


        try {

            const { email, password } = res.locals.body;

            await sequelize.transaction(async () => {

                const sessionLoginData: SessionLoginEntity = { email, password }
                const newToken = await this.sessionUseCase.login(sessionLoginData)

                const response = {
                    message: 'Login authorized',
                    token: newToken.token,
                    expirationToken: newToken.expires_at,
                };

                res.json(response);
            })



        } catch (error) {

            next(error);
        }



    }

    logout = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const token = res.locals.token;

            await sequelize.transaction(async () => {

                await this.sessionUseCase.logout(token)

            })

            res.json({ message: 'Logout success' });
        } catch (error) {

            next(error);
        }
    };

}