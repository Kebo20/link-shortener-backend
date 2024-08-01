import { LinkEntity } from "../../domain/entity/link.entity";
import { LinkRepositoryI } from "../../domain/repository/link.repository";
import { HttpError } from '../../infrastructure/utils/handleError'
import bcrypt from 'bcrypt'

export class LinkUseCase {
    constructor(private readonly linkRepository: LinkRepositoryI) { }

    public register = async (data: LinkEntity) => {

        const shortUrl = ''
        const newData = { ...data, shortUrl }

        const linkCreated = await this.linkRepository.register(newData);
        return linkCreated
    }

    public update = async (data: LinkEntity) => {


        const vUserId = await this.linkRepository.findById(data.idLink)
        if (!vUserId) {
            throw new HttpError({
                code: 'NOT_FOUND',
                message: 'Link. Registro no encontrado.',
            });
        }

        const linkUpdated = await this.linkRepository.update(data);
        return linkUpdated
    }


    public findById = async (id: string) => {
        const linkFind = await this.linkRepository.findById(id);
        return linkFind
    }

    public list = async () => {

        const linkList = await this.linkRepository.list()
        return linkList
    }

    public delete = async ({ idLink, deletedBy }: { idLink: string, deletedBy: string }) => {


        const vLinkId = await this.linkRepository.findById(idLink)
        if (!vLinkId) {
            throw new HttpError({
                code: 'NOT_FOUND',
                message: 'Usuario. Registro no encontrado.',
            });
        }

        const linkUpdated = await this.linkRepository.delete({ idLink, deletedBy });
        return linkUpdated
    }

    public getByShortUrl = async (shortUrl: string) => {

        const link = await this.linkRepository.findByShortUrl(shortUrl);

        if (!link) {
            throw new HttpError({
                code: 'NOT_FOUND',
                message: 'Link. Registro no encontrado.',
            });
        }
        const now = new Date()

        if (link.expiresAt && link.expiresAt <= now) {
            throw new HttpError({
                code: 'FORBIDDEN',
                message: 'Link expirado',
            });
        }

        if (link.active && link.active === 0) {
            throw new HttpError({
                code: 'FORBIDDEN',
                message: 'Link deshabilitado',
            });
        }


        return { ...link, password: link.password ? 1 : 0 }
    }

    public validatePassword = async ({ idLink, password }: { idLink: string, password: string }) => {

        const link = await this.linkRepository.findById(idLink);

        if (!link) {
            throw new HttpError({
                code: 'NOT_FOUND',
                message: 'Link. Registro no encontrado.',
            });
        }
        const now = new Date()

        if (link.expiresAt && link.expiresAt <= now) {
            throw new HttpError({
                code: 'FORBIDDEN',
                message: 'Link expirado',
            });
        }

        if (link.active && link.active === 0) {
            throw new HttpError({
                code: 'FORBIDDEN',
                message: 'Link deshabilitado',
            });
        }

        if (link.password) {

            // const vLink = await this.linkRepository.valiatePassword(password);
            const vLink = await bcrypt.compare(password, link.password);
            if (!vLink) {
                throw new HttpError({
                    code: 'FORBIDDEN',
                    message: 'Link deshabilitado',
                });

            }

        }

        return { ...link, password: link.password ? 1 : 0 }

    }

}