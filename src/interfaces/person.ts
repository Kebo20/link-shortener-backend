// Definir una interfaz para los atributos del modelo
export interface PersonAttributes {
    idPerson?: string;
    firstName: string;
    lastName: string;
    fullName: string;
    sex: 'F' | 'M';
    email: string;
    address: string;
    birthDate: Date;
    document: string;
    phone: string;
    status: number;
    createdBy: string;
    updatedBy?: string;
    deletedBy?: string;
    creationDate: Date;
    updateDate?: Date;
    deletionDate?: Date;
}