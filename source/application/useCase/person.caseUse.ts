import { PersonEntity } from "../../domain/entity/person.entity";
import { PersonRepositoryI } from "../../domain/repository/person.repository";
import { PersonValue } from "../../domain/value/person.value";
import { HttpError } from '../../infrastructure/utils/handleError'

export class PersonUseCase {
    constructor(private readonly personRepository: PersonRepositoryI) { }

    public registerPerson = async (data: PersonEntity) => {

        const vPersonDocument = await this.personRepository.findByDocument(data.document)

        if (vPersonDocument) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: 'Documento ya registrado.',
            });
        }
        const personCreated = await this.personRepository.register(data);
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


    public updatePerson = async (data: PersonEntity) => {


        const { idPerson, document } = data
        const vPersonId = await this.personRepository.findById(idPerson!)

        if (!vPersonId) {
            throw new HttpError({
                code: 'BAD_REQUEST',
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


        const personUpdated = await this.personRepository.update(data);
        return personUpdated
    }
}