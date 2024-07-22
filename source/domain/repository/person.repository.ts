import { PersonEntity } from "../entity/person.entity";


export interface PersonRepositoryI {

    register(userEntity: PersonEntity): Promise<PersonEntity>;
    update(personEntity: PersonEntity): Promise<number>;
    delete(idUser: string): Promise<PersonEntity>;
    list(): Promise<PersonEntity[]>;
    findByDocument(document: string): Promise<PersonEntity | null>;
    findById(id: string): Promise<PersonEntity | null>;

}