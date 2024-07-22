import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
} from 'sequelize-typescript';
import { sequelize } from '../db/mysql';
import { AccessTokenEntity } from '../../domain/entity/accessToken.entity';

@Table({
    tableName: 'it_access_tokens',
    timestamps: false,
    freezeTableName: true,
})
export class AccessTokenModel extends Model<AccessTokenModel> implements AccessTokenEntity {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    idUser!: string;

    @Column(DataType.STRING)
    token!: string;

    @Column(DataType.STRING)
    namespace!: string;

    @Column(DataType.TINYINT)
    revoked!: number;

    @Column(DataType.DATE)
    created_at!: Date;

    @Column(DataType.DATE)
    updated_at!: Date;

    @Column(DataType.DATE)
    expires_at!: Date;
}

// Luego, debes agregar el modelo a la instancia de sequelize
sequelize.addModels([AccessTokenModel]);

export default AccessTokenModel;
