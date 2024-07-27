import { AccessTokenEntity } from "../entity/accessToken.entity";
import { SessionLoginEntity } from "../entity/session.entity";
import { UserEntity } from "../entity/user.entity";


export interface SessionRepositoryI {

    getUserByCredentials(data: SessionLoginEntity): Promise<UserEntity | null>;
    validateSimultaneousSessions({ idUser, sessionPermited }: { idUser: string, sessionPermited: number }): Promise<boolean>;
    validateExpiredPassword({ user, expirationMinutes }: { user: UserEntity, expirationMinutes: number }): Promise<boolean>;
    registerToken(data: UserEntity): Promise<AccessTokenEntity>;
    revokedToken(token: string): Promise<void>;




}