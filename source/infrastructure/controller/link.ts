
import { NextFunction, Request, Response } from "express";
import { LinkService } from '../../application/service/link.service';
export class LinkController {

    constructor(private linkService: LinkService) {
    }


    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


        try {

            const { originalUrl, description, password, expiresAt } = res.locals.body;
            // const { idUser } = res.locals.tokenResponse

            const newData = { originalUrl, description, password, expiresAt }
            const link = await this.linkService.register(newData)


            res.json({ message: 'Link registrado correctamente ', data: link });

        } catch (error) {

            next(error);
        }

    }

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const { idLink, originalUrl, description, password } = res.locals.body;
            const { idUser } = res.locals.tokenResponse

            const newData = { idLink, idUser: idUser, originalUrl, description, password, createdBy: idUser, updateDate: new Date() }
            await this.linkService.update(newData)

            res.json({ message: 'Link actualizado correctamente ' });

        } catch (error) {

            next(error);
        }



    }


    validatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const { shortUrl, password } = res.locals.body;
            // const { idUser } = res.locals.tokenResponse

            const link = await this.linkService.validatePassword(shortUrl, password, req)

            res.json({ data: link });

        } catch (error) {

            next(error);
        }



    }

    list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


        try {

            const links = await this.linkService.list()
            res.json({ data: links });

        } catch (error) {
            next(error);
        }



    }


    get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


        try {

            const { id } = res.locals.body;

            const link = await this.linkService.findById(id)


            res.json({ data: link });

        } catch (error) {

            next(error);
        }



    }


    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


        try {

            const { id } = res.locals.body;
            const { idUser } = res.locals.tokenResponse

            await this.linkService.delete({ idLink: id, deletedBy: idUser })

            res.json({ message: 'Link eliminado correctamente ' });

        } catch (error) {

            next(error);
        }



    }

    getByShortUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


        try {

            const { shortUrl } = res.locals.body;

            const link = await this.linkService.getByShortUrl(shortUrl, req)


            res.json({ data: link });

        } catch (error) {

            next(error);
        }



    }


}