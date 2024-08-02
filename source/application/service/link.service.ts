import { TransactionRepositoryI } from "../../domain/repository/transaction.repository";
import { PersonUseCase } from "../useCase/person.useCase";
import { LinkUseCase } from "../useCase/link.useCase";


export interface LinkRegisterDTO {

    idLink?: string
    idUser: string
    originalUrl: string
    description: string
    password?: string
    createdBy: string

}

export class LinkService {

    constructor(private linkUseCase: LinkUseCase, private transactionRepository: TransactionRepositoryI) { }


    async register(data: LinkRegisterDTO) {

        const orm = await this.transactionRepository.run()

        await orm.transaction(async () => {

            await this.linkUseCase.register(data)
        })

    }

    async update(data: LinkRegisterDTO) {

        const orm = await this.transactionRepository.run()

        await orm.transaction(async () => {

            await this.linkUseCase.update(data)
        })

    }

    async delete({ idLink, deletedBy }: { idLink: string, deletedBy: string }) {

        const orm = await this.transactionRepository.run()

        await orm.transaction(async () => {

            await this.linkUseCase.delete({ idLink, deletedBy })
        })

    }


    async list() {

        const orm = await this.transactionRepository.run()

        let list
        await orm.transaction(async () => {

            list = await this.linkUseCase.list()
        })

        return list

    }

    async findById(id: string) {

        const orm = await this.transactionRepository.run()

        let link

        await orm.transaction(async () => {

            link = await this.linkUseCase.findById(id)
        })

        return link

    }


    async validatePassword(idLink: string, password: string) {


        return await this.linkUseCase.validatePassword({ idLink, password })


    }

    async getByShortUrl(shortUrl: string) {

        const orm = await this.transactionRepository.run()

        let link

        await orm.transaction(async () => {

            link = await this.linkUseCase.getByShortUrl(shortUrl)
        })

        return link

    }
}
