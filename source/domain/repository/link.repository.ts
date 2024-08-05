import { ClickEntity } from "../entity/click.entity";
import { LinkEntity, LinkList, LinkUpdateDTO } from "../entity/link.entity";


export interface LinkRepositoryI {

    register(data: LinkEntity): Promise<LinkEntity>;
    registerClick(data: ClickEntity): Promise<ClickEntity>;
    findById(id: string): Promise<LinkList | null>;
    findByShortUrl(shortUrl: string): Promise<LinkList | null>;
    update(data: LinkUpdateDTO): Promise<number>;
    delete({ idLink, deletedBy }: { idLink: string, deletedBy: string }): Promise<number>;
    list(): Promise<LinkList[]>;
    valiatePassword(password: string): Promise<boolean>;


}