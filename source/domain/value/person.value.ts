import { PersonEntity } from "../entity/person.entity";


export class PersonValue implements PersonEntity {

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

    constructor(data: PersonEntity) {
        {
            this.idPerson = data.idPerson
            this.firstName = data.firstName
            this.lastName = data.lastName
            this.fullName = data.firstName + '' + data.lastName
            this.sex = data.sex;
            this.email = data.email
            this.address = data.address
            this.birthDate = data.birthDate
            this.document = data.document
            this.phone = data.phone
            this.createdBy = data.createdBy;
            this.updatedBy = data.updatedBy;
            this.creationDate = data.creationDate;
            this.updateDate = data.updateDate;


        }

    }


}