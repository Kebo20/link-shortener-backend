
import { NextFunction, Request, Response } from "express";
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { transcode } from 'buffer';
import { UserService } from '../../application/service/user.service';
export class UserController {

    constructor(private userService: UserService) {
    }


    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


        try {

            const { userName, password, email, document, firstName, lastName, sex, phone, address, birthDate } = res.locals.body;
            const { idUser } = res.locals.tokenResponse

            const newDataUser = { userName, email, createdBy: idUser, password, document, firstName, lastName, sex, phone, address, birthDate }
            await this.userService.register(newDataUser)


            res.json({ message: 'Usuario registrado correctamente ' });

        } catch (error) {

            next(error);
        }



    }

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        //DTO EN LOS USE CASE
        //TRANSACCIONES EN UN REPOSITORY E IMPLEMENTRALOS
        //usar service(por controller o modulo) para gestionar 2 o mas use case ??
        //searchAll con criteria
        try {

            const { id, userName, password, email, document, firstName, lastName, sex, phone, address, birthDate } = res.locals.body;
            const { idUser } = res.locals.tokenResponse

            const newDataUser = { idUser: id, userName, email, createdBy: idUser, password, document, firstName, lastName, sex, phone, address, birthDate }
            await this.userService.update(newDataUser)

            res.json({ message: 'Usuario actualizado correctamente ' });

        } catch (error) {

            next(error);
        }



    }

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


        try {

            const { id } = res.locals.body;
            const { idUser } = res.locals.tokenResponse

            await this.userService.delete({ idUser: id, deletedBy: idUser })

            res.json({ message: 'Usuario eliminado correctamente ' });

        } catch (error) {

            next(error);
        }



    }

    list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


        try {

            const listUsers = await this.userService.list()
            res.json({ data: listUsers });

        } catch (error) {
            next(error);
        }



    }


    get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


        try {

            const { id } = res.locals.body;

            const findUser = await this.userService.findById(id)


            res.json({ data: findUser });

        } catch (error) {

            next(error);
        }



    }


    pdf = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


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

            next(error);
        }



    }


}