import { TransactionRepositoryI } from "../../domain/repository/transaction.repository";
import { LinkUseCase } from "../useCase/link.useCase";
import { LinkRegisterDTO, LinkUpdateDTO } from "../../domain/entity/link.entity";
import { NextFunction, Request, Response } from "express";



export class LinkService {

    constructor(private linkUseCase: LinkUseCase, private transactionRepository: TransactionRepositoryI) { }


    async register(data: LinkRegisterDTO) {

        const orm = await this.transactionRepository.run()
        let link
        await orm.transaction(async () => {

            link = await this.linkUseCase.register(data)
        })

        return link

    }

    async update(data: LinkUpdateDTO) {

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


    async validatePassword(idLink: string, password: string, req: Request) {


        return await this.linkUseCase.validatePassword({ idLink, password, req })


    }

    async getByShortUrl(shortUrl: string, req: Request) {

        const orm = await this.transactionRepository.run()

        let link

        await orm.transaction(async () => {

            link = await this.linkUseCase.getByShortUrl(shortUrl, req)
        })

        return link

    }
}
