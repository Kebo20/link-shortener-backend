export interface AccessTokenAttributes {

    id?: string
    idUser: string
    token: string
    namespace?: string
    revoked: number
    created_at: Date
    updated_at?: Date
    expires_at: Date

}