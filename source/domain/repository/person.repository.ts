import { PersonEntity } from "../entity/person.entity";


export interface PersonRepositoryI {

    register(userEntity: PersonEntity): Promise<PersonEntity>;
    update(personEntity: PersonEntity): Promise<PersonEntity>;
    delete(idUser: string): Promise<PersonEntity>;
    list(): Promise<PersonEntity[]>;
    existByDocument(document: string): Promise<number>;


}