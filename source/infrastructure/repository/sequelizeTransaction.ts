import { TransactionRepositoryI } from "../../domain/repository/transaction.repository";
import { Transaction } from 'sequelize';
import { sequelize } from '../db/mysql';



export class SequelizeRepository implements TransactionRepositoryI {
    // start(): Promise<TransactionRepositoryI> {
    //     throw new Error("Method not implemented.");
    // }
    // async start(callback): Promise<TransactionRepositoryI> {
    //     const sequelizeTransaction = await sequelize.transaction();
    //         await sequelize.transaction(async () => { callback()})
    //      ;
    // }

    async run(): Promise<any> {
        // const sequelizeTransaction = await sequelize.transaction();
        return sequelize

    }
}

// export class TransactionRepository implements TransactionRepositoryI {
//     constructor(private sequelizeTransaction: Transaction) { }

//     async commit(): Promise<void> {
//         await this.sequelizeTransaction.commit();
//     }
//     async rollback(): Promise<void> {
//         await this.sequelizeTransaction.rollback();
//     }

// }