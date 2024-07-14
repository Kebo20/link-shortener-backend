
export interface UserEntity {

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

}


