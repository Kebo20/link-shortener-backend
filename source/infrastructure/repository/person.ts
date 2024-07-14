import { Op, Transaction } from 'sequelize';
import PersonModel from "../model/person";
import { HttpError } from "../utils/handleError";
import { PersonRepositoryI } from "../../domain/repository/person.repository";
import { PersonEntity } from "../../domain/entity/person.entity";


export class PersonRepository implements PersonRepositoryI {
    async register(personEntity: PersonEntity): Promise<PersonEntity> {
        const newPerson = await PersonModel.create(personEntity)
        return newPerson
    }
    update(personEntity: PersonEntity): Promise<PersonEntity> {
        throw new Error("Method not implemented.");
    }
    delete(idUser: string): Promise<PersonEntity> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<PersonEntity[]> {
        throw new Error("Method not implemented.");
    }
    async existByDocument(document: string): Promise<number> {
        try {
            const oPerson = await PersonModel.count({
                where: {
                    document: document,
                },
            });

            if (oPerson > 0) {
                throw new HttpError({
                    code: 'BAD_REQUEST',
                    message: 'Persona ya registrada.',
                });
            }

            return oPerson

        } catch (error: any) {
            if (error instanceof HttpError) {
                throw error; // Si el error es de tipo HttpError, lo relanzamos
            } else {
                throw new Error(String(error)); // Convertimos a string el error desconocido y lo lanzamos
            }
        }
    }

}