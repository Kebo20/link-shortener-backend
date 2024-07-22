import { Op, Transaction } from 'sequelize';
import PersonModel from "../model/person";
import { HttpError } from "../utils/handleError";
import { PersonRepositoryI } from "../../domain/repository/person.repository";
import { PersonEntity } from "../../domain/entity/person.entity";


export class PersonRepository implements PersonRepositoryI {
    async findById(id: string): Promise<PersonEntity | null> {
        const oPerson = await PersonModel.findByPk(id)
        return oPerson
    }
    async register(personEntity: PersonEntity): Promise<PersonEntity> {
        const newPerson = await PersonModel.create(personEntity)
        return newPerson
    }
    async update(personEntity: PersonEntity): Promise<number> {
        const newPerson = await PersonModel.update(personEntity, {
            where: {
                idPerson: personEntity.idPerson,
            }
        },)
        return newPerson[0]
    }
    delete(idUser: string): Promise<PersonEntity> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<PersonEntity[]> {
        throw new Error("Method not implemented.");
    }
    async findByDocument(document: string): Promise<PersonEntity | null> {

        const oPerson = await PersonModel.findOne({
            where: {
                document: document,
            },
        });

        return oPerson


    }

}