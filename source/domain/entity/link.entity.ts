
export interface LinkEntity {

    idLink?: string
    idUser: string
    originalUrl: string
    shortUrl: string
    description: string
    expiresAt: Date
    password?: string
    countClicks: number
    status: number
    active: number
    createdBy: string
    updatedBy?: string
    deletedBy?: string
    creationDate: Date
    updateDate?: Date
    deletionDate?: Date

}


export interface LinkList {

    idLink?: string
    originalUrl: string
    shortUrl: string
    description: string
    expiresAt: Date
    countClicks: number
    active: number
    password?: string

}




