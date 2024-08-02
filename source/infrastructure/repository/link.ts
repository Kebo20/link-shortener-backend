// import { UserAttributes } from '../interfaces/user';
import { Op } from 'sequelize';

import { LinkRepositoryI } from '../../domain/repository/link.repository'
import { UserEntity } from '../../domain/entity/user.entity';
import UserModel from "../model/user";
import PersonModel from "../model/person";
import { UserPersonList } from '../../domain/entity/userPerson.entity';
import { LinkEntity, LinkList } from '../../domain/entity/link.entity';
import LinkModel from '../model/link';



export class LinkRepository implements LinkRepositoryI {
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
            attributes: ['idLink', 'originalUrl', 'shortUrl', 'description', 'expiresAt', 'countClicks', 'active'],
            where: { status: 1, shortUrl }
        })
        return link
    }
    async update(data: LinkEntity): Promise<number> {
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
    valiatePassword(password: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }



}