
import { LinkRepositoryI } from '../../domain/repository/link.repository'
import { LinkEntity, LinkList, LinkUpdateDTO } from '../../domain/entity/link.entity';
import LinkModel from '../model/link';
import { ClickEntity } from '../../domain/entity/click.entity';
import ClickModel from '../model/click';
import { Link } from 'swagger-jsdoc';



export class LinkRepository implements LinkRepositoryI {

    async registerClick(data: ClickEntity): Promise<ClickEntity> {
        const click = await ClickModel.create(data)
        return click
    }

    valiatePassword(password: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    async register(data: LinkEntity): Promise<LinkEntity> {

        const link = await LinkModel.create(data)
        return link
    }
    async findById(id: string): Promise<LinkList | null> {
        const link = await LinkModel.findOne({
            attributes: ['idLink', 'originalUrl', 'shortUrl', 'description', 'expiresAt', 'countClicks', 'active'],
            where: { status: 1, idLink: id }
        })
        return link
    }
    async findByShortUrl(shortUrl: string): Promise<LinkList | null> {
        const link = await LinkModel.findOne({
            attributes: ['idLink', 'originalUrl', 'shortUrl', 'description', 'expiresAt', 'countClicks', 'active', 'password'],
            where: { status: 1, shortUrl }
        })
        return link
    }
    async update(data: LinkUpdateDTO): Promise<number> {
        const updateUser = await LinkModel.update(data, {
            where: {
                idUser: data.idLink,
            }
        },)
        return updateUser[0]
    }
    async delete({ idLink, deletedBy }: { idLink: string; deletedBy: string; }): Promise<number> {
        const updateLink = await LinkModel.update(
            { status: 0, deletedBy, deletionDate: new Date() },
            {
                where: {
                    idLink,
                }
            },)
        return updateLink[0]
    }
    async list(): Promise<LinkList[]> {
        const links = await LinkModel.findAll({
            attributes: ['idLink', 'originalUrl', 'shortUrl', 'description', 'expiresAt', 'countClicks', 'active'],
            where: { status: 1 }
        })
        return links
    }
    validatePassword(password: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }



}