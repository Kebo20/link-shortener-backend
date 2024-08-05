import { Table, Column, Model, PrimaryKey, DataType, Default, ForeignKey, BelongsTo, IsUUID, HasOne } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { sequelize } from '../db/mysql';
import LinkModel from './link';
import { ClickEntity } from '../../domain/entity/click.entity';


@Table({
    tableName: 'clicks',
    timestamps: false,
    freezeTableName: true
})
class ClickModel extends Model<LinkModel, ClickEntity> implements ClickEntity {


    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    public idClick!: string;

    @ForeignKey(() => LinkModel) // Define la clave foránea
    @Column(DataType.STRING)
    idLink!: string;

    @Column(DataType.STRING)
    public metaData!: string;

    @Column(DataType.STRING)
    public referrer!: string;

    @Column(DataType.STRING)
    public deviceType!: string;

    @Column(DataType.STRING)
    public city!: string;

    @Column(DataType.STRING)
    public country!: string;

    @Column(DataType.DATE)
    public clickedAt!: Date;

    @Column(DataType.STRING)
    public userAgent!: string;

    @Column(DataType.STRING)
    public ip!: string;

    @Column(DataType.TINYINT)
    public status!: number;

    @Column(DataType.STRING)
    public createdBy!: string;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    public creationDate!: Date;

    @BelongsTo(() => LinkModel)
    public link!: LinkModel;
}

sequelize.addModels([ClickModel]);
export default ClickModel;
