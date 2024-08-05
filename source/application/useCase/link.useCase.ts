import axios from "axios";
import { LinkEntity, LinkRegisterDTO, LinkUpdateDTO } from "../../domain/entity/link.entity";
import { LinkRepositoryI } from "../../domain/repository/link.repository";
import { HttpError } from '../../infrastructure/utils/handleError'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from "express";


export class LinkUseCase {
    constructor(private readonly linkRepository: LinkRepositoryI) { }

    public register = async (data: LinkRegisterDTO) => {


        let shortUrl = this.generateUniqueCode(6)

        while (await this.linkRepository.findByShortUrl(shortUrl)) {
            shortUrl = this.generateUniqueCode(6)
        }


        const newData = { ...data, shortUrl, creationDate: new Date(), status: 1, active: 1, countClicks: 0, expiresAt: new Date() }

        const linkCreated = await this.linkRepository.register(newData);
        return linkCreated
    }


    generateUniqueCode = (length: number) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    public update = async (data: LinkUpdateDTO) => {


        const vUserId = await this.linkRepository.findById(data.idLink!)
        if (!vUserId) {
            throw new HttpError({
                code: 'NOT_FOUND',
                message: 'Link. Registro no encontrado.',
            });
        }

        const updateData = { ...data, shortUrl: vUserId.shortUrl, creationDate: new Date(), status: 1, active: 1, countClicks: 0, expiresAt: new Date() }
        const linkUpdated = await this.linkRepository.update(updateData);
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

    public getByShortUrl = async (shortUrl: string, req: Request) => {

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

        if (!link.password) {
            const updateData = { updateDate: new Date(), countClicks: link.countClicks + 1, idLink: link.idLink }
            await this.linkRepository.update(updateData);
            await this.registerClick(link.idLink, req)

        }


        return { ...link, password: link.password ? 1 : 0 }
    }


    public validatePassword = async ({ idLink, password, req }: { idLink: string, password: string, req: Request }) => {

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
                    message: 'Contraseña incorrecta',
                });

            }

            await this.registerClick(link.idLink, req)



        }

        return { ...link, password: link.password ? 1 : 0 }

    }

    async registerClick(idLink: string, req: Request) {

        const ip = req.ip ?? null
        const userAgent = req.headers['user-agent'] ?? null
        const referrer = req.headers.referer ?? null
        const deviceType = userAgent ? this.getDeviceType(userAgent) : null

        let dataIp: any
        if (ip) dataIp = await this.getDataGeoIp(ip)

        const registerDataClick = {
            idLink, metaData: JSON.stringify(req.headers), referrer,
            deviceType, city: dataIp.city ?? '', country: dataIp.country ?? '',
            userAgent, ip,
            clickedAt: new Date(),
            creationDate: new Date()
        }
        await this.linkRepository.registerClick(registerDataClick)

    }

    getDeviceType(userAgent: string): string {
        if (/mobile/i.test(userAgent)) {
            return 'Mobile';
        }
        if (/tablet/i.test(userAgent)) {
            return 'Tablet';
        }
        if (/iPad|Android|Touch/.test(userAgent)) {
            return 'Tablet';
        }
        return 'Desktop';
    }

    async getDataGeoIp(ip: string): Promise<object> {

        try {

            const response = await axios.get(`http://ip-api.com/json/${ip}`);
            return response.data

        } catch {
            return {}
        }
    }

}