import { Op, Transaction } from 'sequelize';
import PersonModel from "../models/person";
import { PersonAttributes } from "../interfaces/person";
import { sequelize } from '../config/db'
import { HttpError } from "../utils/handleError";


export class PersonService {


    static existByDocument = async (document: string): Promise<boolean> => {


        try {
            const oPerson = await PersonModel.findOne({
                where: {
                    document: document,
                    status: 1,
                },
            });
            return !!oPerson

        } catch (error) {

            return false
        }
    }

    static createPerson = async (data: PersonAttributes, transaction: Transaction): Promise<PersonModel> => {

        const newPerson = await PersonModel.create(data, { transaction })

        return newPerson


    }

}