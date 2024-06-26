import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { PersonAttributes } from '../interfaces/person';



// Definir una interfaz para los atributos opcionales durante la creación
interface PersonCreationAttributes extends Optional<PersonAttributes, 'idPerson' | 'deletionDate'> { }

// Crear la clase de modelo extendiendo `Model`
class PersonModel extends Model<PersonAttributes, PersonCreationAttributes> implements PersonAttributes {
    public idPerson!: string;
    public firstName!: string;
    public lastName!: string;
    public fullName!: string;
    public sex!: 'F' | 'M';
    public email!: string;
    public address!: string;
    public birthDate!: Date;
    public document!: string;
    public phone!: string;
    public status!: number;
    public createdBy!: string;
    public updatedBy!: string;
    public deletedBy!: string;
    public creationDate!: Date;
    public updateDate!: Date;
    public deletionDate?: Date;
}

// Definir el modelo usando la clase
PersonModel.init({
    idPerson: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    fullName: {
        type: DataTypes.STRING,
    },
    sex: {
        type: DataTypes.ENUM('F', 'M'),
    },
    email: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    birthDate: {
        type: DataTypes.DATE,
        // get() {
        //     return sequelize.Sequelize.fn('DATE_FORMAT', sequelize.Sequelize.col('birthDate'), '%Y-%m-%d %H:%i:%s');
        // }
    },
    document: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.TINYINT,
    },
    createdBy: {
        type: DataTypes.STRING,
    },
    updatedBy: {
        type: DataTypes.STRING,
    },
    deletedBy: {
        type: DataTypes.STRING,
    },
    creationDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updateDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    deletionDate: {
        type: DataTypes.DATE,
    },
}, {
    sequelize,
    tableName: 'persons',
    timestamps: false,
    freezeTableName: true,
});

export default PersonModel;
