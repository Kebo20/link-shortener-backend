import { UserEntity } from "../entity/user.entity";


export class UserValue implements UserEntity {

    idUser: string
    userName: string
    email: string
    password: string
    idGroup: number
    toChange: number
    status: number
    reset?: number
    acceptPrivacyPolicy?: number
    lastChangePassword?: Date
    createdBy: string
    updatedBy?: string
    deletedBy?: string
    creationDate: Date
    updateDate?: Date
    deletionDate?: Date

    // constructor({ idUser, userName, email, password, idGroup, toChange, status, reset, acceptPrivacyPolicy, lastChangePassword, createdBy, updatedBy, deletedBy, creationDate, updateDate, deletionDate }:
    //     {
    //         idUser: number, userName: string, email: string, password: string, idGroup: number, toChange: number, status: number, reset?: number | undefined,
    //         acceptPrivacyPolicy?: number | undefined, lastChangePassword?: Date | undefined, createdBy: string, updatedBy?: string | undefined, deletedBy?: string | undefined,
    //         creationDate: Date, updateDate?: Date | undefined, deletionDate?: Date | null | undefined
    //     }
    // )
    constructor(data: UserEntity) {
        {
            this.idUser = data.idUser;
            this.userName = data.userName;
            this.email = data.email;
            this.password = data.password;
            this.idGroup = data.idGroup ?? 1;
            this.toChange = data.toChange;
            this.status = data.status ?? 1;
            this.reset = data.reset ?? 0;
            this.acceptPrivacyPolicy = data.acceptPrivacyPolicy;
            this.lastChangePassword = data.lastChangePassword;
            this.createdBy = data.createdBy;
            this.updatedBy = data.updatedBy;
            this.deletedBy = data.deletedBy;
            this.creationDate = data.creationDate;
            this.updateDate = data.updateDate;
            this.deletionDate = data.deletionDate;


        }

    }

}