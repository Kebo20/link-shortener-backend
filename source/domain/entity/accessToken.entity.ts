export interface AccessTokenEntity {

    id?: number
    idUser: string
    token: string
    revoked: number
    created_at: Date
    updated_at?: Date
    expires_at: Date

}