import UserModel from '../model/user'
import PersonModel from '../model/person'
import { Op } from "sequelize";

import { sequelize, namespace } from '../db/mysql'
import { HttpError } from '../utils/handleError'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from "express";
import { UserUseCase } from '../../application/useCase/user.useCase';
import { PersonUseCase } from '../../application/useCase/person.useCase';
import { PersonEntity } from '../../domain/entity/person.entity';
import { UserEntity } from '../../domain/entity/user.entity';
// import { UserAttributes } from '../interfaces/user';
// import { PersonAttributes } from '../interfaces/person';
// import { UserService } from '../services/user';
// import { PersonService } from '../services/person';
import PDFDocument from 'pdfkit';
import fs from 'fs';
export class UserController {

    constructor(private userUseCase: UserUseCase, private personUseCase: PersonUseCase) {
    }


    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


        try {

            const { userName, password, email, document, firstName, lastName, sex, phone, address, birthDate } = res.locals.body;
            const { idUser } = res.locals.tokenResponse

            await sequelize.transaction(async () => {

                const newDataPerson: PersonEntity = { email, document, firstName, lastName, fullName: firstName + ' ' + lastName, sex, phone, address, birthDate, createdBy: idUser, creationDate: new Date() }
                const newPerson = await this.personUseCase.registerPerson(newDataPerson)

                const newDataUser: UserEntity = { idUser: newPerson.idPerson!, userName, password: await bcrypt.hash(password, 10), email, createdBy: idUser, toChange: 0, status: 1, creationDate: new Date(), idGroup: 1 }
                await this.userUseCase.registerUser(newDataUser)
            })


            res.json({ message: 'Usuario registrado correctamente ' });

        } catch (error) {

            next(error);
        }



    }

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


        try {

            const { id, userName, password, email, document, firstName, lastName, sex, phone, address, birthDate } = res.locals.body;
            const { idUser } = res.locals.tokenResponse

            await sequelize.transaction(async () => {

                const newDataPerson: PersonEntity = { idPerson: id, email, document, firstName, lastName, fullName: firstName + ' ' + lastName, sex, phone, address, birthDate, createdBy: idUser, creationDate: new Date(), updatedBy: idUser }
                await this.personUseCase.updatePerson(newDataPerson)

                const newDataUser: UserEntity = { idUser: id, userName, password: await bcrypt.hash(password, 10), email, createdBy: idUser, toChange: 0, status: 1, creationDate: new Date(), idGroup: 12, updatedBy: idUser }
                await this.userUseCase.updateUser(newDataUser)

            })

            res.json({ message: 'Usuario actualizado correctamente ' });

        } catch (error) {

            next(error);
        }



    }

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


        try {

            const { id } = res.locals.body;
            const { idUser } = res.locals.tokenResponse
            await sequelize.transaction(async () => {

                await this.userUseCase.delete({ idUser: id, deletedBy: idUser })

            })
            res.json({ message: 'Usuario eliminado correctamente ' });

        } catch (error) {

            next(error);
        }



    }

    list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


        try {

            const listUsers = await this.userUseCase.list()
            res.json({ data: listUsers });

        } catch (error) {
            next(error);
        }



    }


    get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


        try {

            const { id } = res.locals.body;

            const findUser = await this.userUseCase.findById(id)


            res.json({ data: findUser });

        } catch (error) {

            next(error);
        }



    }


    pdf = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const transaction = await sequelize.transaction();

        try {

            const doc = new PDFDocument();

            // Path to save the PDF file
            const output = fs.createWriteStream('output.pdf');
            doc.pipe(output);

            // Add title
            doc.fontSize(20).text('Certificado de Cumplimiento', { align: 'center' });

            // Add content similar to the uploaded PDF
            doc.moveDown();
            doc.fontSize(12).text('Este es un certificado que asegura que el individuo ha cumplido con todos los requisitos necesarios.', {
                align: 'justify'
            });

            // Add image (optional)
            // doc.image('path/to/image.jpg', {
            //   fit: [250, 300],
            //   align: 'center',
            //   valign: 'center'
            // });

            // Add more content...
            doc.addPage().fontSize(15).text('Segunda página con más contenido.');

            // Finalize the PDF and end the stream
            doc.end();

            // Log when the PDF is written
            // output.on('finish', () => {
            //     res.json({ data: 'PDF generated successfully' });

            // });

            // Return a promise that resolves when the file has been fully written



            const promesa = new Promise<string>((resolve, reject) => {
                output.on('finish', () => resolve('PDF generado exitosamente'));
                output.on('error', (err) => { reject(`Error al generar el PDF: ${err.message}`) });
            });


            const result = await promesa
            res.json({ data: result });

        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            next(error);
        }



    }


}