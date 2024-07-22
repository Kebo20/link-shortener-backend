import { Table, Column, Model, DataType, Default, PrimaryKey, IsUUID, HasOne } from 'sequelize-typescript';
import UserModel from './user'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import { sequelize } from '../db/mysql';
import { PersonEntity } from '../../domain/entity/person.entity';

@Table({
    tableName: 'persons',
    timestamps: false,
    freezeTableName: true

})
export class PersonModel extends Model<PersonModel, PersonEntity> implements PersonEntity {
    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    idPerson!: string;

    @Column(DataType.STRING)
    firstName!: string;

    @Column(DataType.STRING)
    lastName!: string;

    @Column(DataType.STRING)
    fullName!: string;

    @Column(DataType.ENUM('F', 'M'))
    sex!: 'F' | 'M';

    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    address!: string;

    @Column(DataType.DATE)
    birthDate!: Date;

    @Column(DataType.STRING)
    document!: string;

    @Column(DataType.STRING)
    phone!: string;

    @Column(DataType.TINYINT)
    status!: number;

    @Column(DataType.STRING)
    createdBy!: string;

    @Column(DataType.STRING)
    updatedBy!: string;

    @Column(DataType.STRING)
    deletedBy!: string;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    creationDate!: Date;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    updateDate!: Date;

    @Column(DataType.DATE)
    deletionDate?: Date;

    // @HasOne(() => UserModel)
    // public user!: UserModel;

    getFormattedBirthDate(): string {
        const date = new Date(this.birthDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    }
}

sequelize.addModels([PersonModel]);

export default PersonModel;
