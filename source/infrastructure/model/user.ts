import { Table, Column, Model, PrimaryKey, DataType, Default, ForeignKey, BelongsTo, IsUUID, HasMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { sequelize } from '../db/mysql';
import PersonModel from './person';
import { UserEntity } from '../../domain/entity/user.entity';
import LinkModel from './link';

// interface UserCreationAttributes extends Optional<UserEntity, 'idUser' | 'creationDate' | 'updateDate' | 'deletionDate'> { }

@Table({
    tableName: 'users',
    timestamps: false,
    freezeTableName: true
})
// class UserModel extends Model<UserEntity, UserCreationAttributes> implements UserEntity {
class UserModel extends Model<UserModel, UserEntity> implements UserEntity {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    @ForeignKey(() => PersonModel) // Define la clave foránea
    public idUser!: string;

    @Column(DataType.STRING)
    public userName!: string;

    @Column(DataType.STRING)
    public email!: string;

    @Column(DataType.STRING)
    public password!: string;

    @Column(DataType.INTEGER)
    public idGroup!: number;

    @Column(DataType.INTEGER)
    public toChange!: number;

    @Column(DataType.TINYINT)
    public status!: number;

    @Column(DataType.INTEGER)
    public reset!: number;

    @Column(DataType.DATE)
    public lastChangePassword!: Date;

    @Column(DataType.INTEGER)
    public acceptPrivacyPolicy!: number;

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

    @BelongsTo(() => PersonModel)
    public person!: PersonModel;
}

// UserModel.belongsTo(PersonModel, { foreignKey: 'idUser' });

// Luego, debes agregar el modelo a la instancia de sequelize
sequelize.addModels([UserModel]);
export default UserModel;
