import { PersonEntity } from "../../domain/entity/person.entity";
import { PersonRepositoryI } from "../../domain/repository/person.repository";
import { PersonValue } from "../../domain/value/person.value";

export class PersonUseCase {
    constructor(private readonly personRepository: PersonRepositoryI) { }

    public registerPerson = async (data: PersonEntity) => {
        const personValue = new PersonValue(data);
        const personCreated = await this.personRepository.register(personValue);
        return personCreated
    }

    public existByDocument = async (document: string) => {
        const personFind = await this.personRepository.existByDocument(document);
        return personFind
    }
}