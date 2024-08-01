import { PersonEntity } from "../../domain/entity/person.entity";
import { PersonRepositoryI } from "../../domain/repository/person.repository";
import { PersonValue } from "../../domain/value/person.value";
import { HttpError } from '../../infrastructure/utils/handleError'

interface registerDto {
    idPerson?: string
    firstName: string
    lastName: string
    sex: 'F' | 'M'
    email: string
    address: string
    birthDate: Date
    document: string
    phone: string
    createdBy: string

}

export class PersonUseCase {
    constructor(private readonly personRepository: PersonRepositoryI) { }

    public register = async (data: registerDto) => {

        const vPersonDocument = await this.personRepository.findByDocument(data.document)

        if (vPersonDocument) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: 'Documento ya registrado.',
            });
        }
        const registerData: PersonEntity = { ...data, fullName: data.firstName + ' ' + data.lastName, creationDate: new Date() }
        const personCreated = await this.personRepository.register(registerData);
        return personCreated
    }

    public findByDocument = async (document: string) => {
        const personFind = await this.personRepository.findByDocument(document);
        return personFind
    }

    public findById = async (id: string) => {
        const personFind = await this.personRepository.findById(id);
        return personFind
    }


    public update = async (data: registerDto) => {

        const { idPerson, document } = data

        const vPersonId = await this.personRepository.findById(idPerson!)

        if (!vPersonId) {
            throw new HttpError({
                code: 'NOT_FOUND',
                message: 'Usuario. Registro no encontrado.',
            });
        }


        const vPersonDocument = await this.personRepository.findByDocument(document)

        if (vPersonDocument && vPersonDocument.idPerson !== idPerson) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: 'Documento ya registrado.',
            });
        }

        const updateData: PersonEntity = { ...data, fullName: data.firstName + ' ' + data.lastName, creationDate: new Date() }
        const personUpdated = await this.personRepository.update(updateData);
        return personUpdated
    }
}