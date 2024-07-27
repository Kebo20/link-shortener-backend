import { SessionLoginEntity } from "../../domain/entity/session.entity";
import { SessionRepositoryI } from "../../domain/repository/session.repository";
import { HttpError } from '../../infrastructure/utils/handleError'

export class SessionUseCase {
    constructor(private readonly sessionRepository: SessionRepositoryI) { }

    public login = async (data: SessionLoginEntity) => {

        const { password, email } = data

        const user = await this.sessionRepository.getUserByCredentials({ password, email })

        if (!user) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: 'Usuario o contraseña inválidos',
            });
        }


        const validateSimultaneousSessions = await this.sessionRepository.validateSimultaneousSessions({ idUser: user.idUser, sessionPermited: 30 })

        if (!validateSimultaneousSessions) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: 'Alcanzó el limite de sesiones abiertas.',
            });
        }

        const validateExpiredPassword = await this.sessionRepository.validateExpiredPassword({ user, expirationMinutes: 700 })

        if (!validateExpiredPassword) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: 'Su contraseña temporal ha caducado, vuelva a solicitar una nueva contraseña.',
            });
        }

        const newToken = await this.sessionRepository.registerToken(user)

        return newToken

    }

    public logout = async (token: string) => {


        await this.sessionRepository.revokedToken(token)

    }


}