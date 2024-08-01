import { LinkEntity, LinkList } from "../entity/link.entity";


export interface LinkRepositoryI {

    register(data: LinkEntity): Promise<LinkEntity>;
    findById(id: string): Promise<LinkList | null>;
    findByShortUrl(id: string): Promise<LinkList | null>;
    update(data: LinkEntity): Promise<number>;
    delete({ idLink, deletedBy }: { idLink: string, deletedBy: string }): Promise<number>;
    list(): Promise<LinkList[]>;
    valiatePassword(password: string): Promise<boolean>;


}