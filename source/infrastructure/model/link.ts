import { Table, Column, Model, PrimaryKey, DataType, Default, ForeignKey, BelongsTo, IsUUID, HasOne } from 'sequelize-typescript';
import { sequelize } from '../db/mysql';
import UserModel from './user';
import { LinkEntity } from '../../domain/entity/link.entity';


@Table({
    tableName: 'links',
    timestamps: false,
    freezeTableName: true
})
class LinkModel extends Model<LinkModel, LinkEntity> implements LinkEntity {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public idLink!: string;

    @ForeignKey(() => UserModel) // Define la clave foránea
    @Column(DataType.STRING)
    idUser!: string;

    @Column(DataType.STRING)
    public originalUrl!: string;

    @Column(DataType.STRING)
    public shortUrl!: string;

    @Column(DataType.STRING)
    public password!: string;

    @Column(DataType.STRING)
    public description!: string;

    @Column(DataType.DATE)
    public expiresAt!: Date;

    @Column(DataType.INTEGER)
    public countClicks!: number;

    @Column(DataType.TINYINT)
    public status!: number;

    @Column(DataType.TINYINT)
    public active!: number;

    @Column(DataType.STRING)
    public createdBy!: string;

    @Column(DataType.STRING)
    public updatedBy!: string;

    @Column(DataType.STRING)
    public deletedBy!: string;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    public creationDate!: Date;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    public updateDate!: Date;

    @Column(DataType.DATE)
    public deletionDate!: Date;

    @BelongsTo(() => UserModel)
    public user!: UserModel;
}

sequelize.addModels([LinkModel]);
export default LinkModel;
