// Definir una interfaz para los atributos del modelo
export interface PersonEntity {
    idPerson?: string
    firstName: string
    lastName: string
    fullName: string
    sex: 'F' | 'M'
    email: string
    address: string
    birthDate: Date
    document: string
    phone: string
    createdBy: string
    updatedBy?: string
    creationDate: Date
    updateDate?: Date
}