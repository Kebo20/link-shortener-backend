import { TransactionRepositoryI } from "../../domain/repository/transaction.repository";
import { PersonUseCase } from "../useCase/person.useCase";
import { UserUseCase } from "../useCase/user.useCase";


interface registerDto {

    idUser?: string
    idPerson?: string

    userName: string
    email: string
    password: string
    createdBy: string

    firstName: string
    lastName: string
    sex: 'F' | 'M'
    address: string
    birthDate: Date
    document: string
    phone: string
}

export class UserService {

    constructor(private userUseCase: UserUseCase, private personUseCase: PersonUseCase, private transactionRepository: TransactionRepositoryI) { }


    async register(data: registerDto) {

        const orm = await this.transactionRepository.run()

        await orm.transaction(async () => {

            const person = await this.personUseCase.register(data)
            await this.userUseCase.register({ ...data, idUser: person.idPerson! })
        })

    }

    async update(data: registerDto) {

        const orm = await this.transactionRepository.run()

        await orm.transaction(async () => {

            await this.personUseCase.update({ ...data, idPerson: data.idUser! })
            await this.userUseCase.update({ ...data, idUser: data.idUser! })
        })

    }

    async delete({ idUser, deletedBy }: { idUser: string, deletedBy: string }) {

        const orm = await this.transactionRepository.run()

        await orm.transaction(async () => {

            await this.userUseCase.delete({ idUser, deletedBy })
        })

    }


    async list() {

        const orm = await this.transactionRepository.run()

        let list
        await orm.transaction(async () => {

            list = await this.userUseCase.list()
        })

        return list

    }

    async findById(id: string) {

        const orm = await this.transactionRepository.run()

        let user

        await orm.transaction(async () => {

            user = await this.userUseCase.findById(id)
        })

        return user

    }
}
