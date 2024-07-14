import { DataTypes, Optional, Model } from 'sequelize';
import { sequelize } from '../db/mysql'

import PersonModel from './person';


// export const UserModel = sequelize.define(
//     'users',
//     {
//         idUser: {
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//         },
//         userName: {
//             type: DataTypes.STRING,
//         },
//         email: {
//             type: DataTypes.STRING,
//         },
//         password: {
//             type: DataTypes.STRING,
//         },
//         idGroup: {
//             type: DataTypes.INTEGER,
//         },
//         toChange: {
//             type: DataTypes.INTEGER,
//         },
//         status: {
//             type: DataTypes.TINYINT,
//         },
//         reset: {
//             type: DataTypes.INTEGER,
//         },

//         acceptPrivacyPolicy: {
//             type: DataTypes.INTEGER,
//         },
//         createdBy: {
//             type: DataTypes.STRING,
//         },

//         updatedBy: {
//             type: DataTypes.STRING,
//         },

//         deletedBy: {
//             type: DataTypes.STRING,
//         },


//         creationDate: {
//             type: DataTypes.DATE,
//             defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
//         },

//         updateDate: {
//             type: DataTypes.DATE,
//             defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')

//         },

//         deletionDate: {
//             type: DataTypes.DATE,
//         },



//     },
//     {
//         timestamps: false,
//         freezeTableName: true,
//     });

// UserModel.belongsTo(PersonModel, { foreignKey: 'idUser', targetKey: 'idPerson' });

// export default UserModel
import { UserEntity } from '../../domain/entity/user.entity';

// Define los atributos que son opcionales al crear una nueva instancia
interface UserCreationAttributes extends Optional<UserEntity, 'idUser' | 'creationDate' | 'updateDate' | 'deletionDate'> { }
// // Define la instancia del modelo User
// interface UserInstance extends Model<UserEntity, UserCreationAttributes>, UserEntity { }

// Define la clase del modelo User
class UserModel extends Model<UserEntity, UserCreationAttributes> implements UserEntity {
    public idUser!: string;
    public userName!: string;
    public email!: string;
    public password!: string;
    public idGroup!: number;
    public toChange!: number;
    public status!: number;
    public reset!: number;
    public acceptPrivacyPolicy!: number;
    public lastChangePassword!: Date;
    public createdBy!: string;
    public updatedBy!: string;
    public deletedBy!: string;
    public creationDate!: Date;
    public updateDate!: Date;
    public deletionDate!: Date;
}

UserModel.init(
    {
        idUser: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        idGroup: {
            type: DataTypes.INTEGER,
        },
        toChange: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.TINYINT,
        },
        reset: {
            type: DataTypes.INTEGER,
        },

        lastChangePassword: {
            type: DataTypes.DATE,
        },
        acceptPrivacyPolicy: {
            type: DataTypes.INTEGER,
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
            defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
        },

        updateDate: {
            type: DataTypes.DATE,
            defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')

        },

        deletionDate: {
            type: DataTypes.DATE,
        },



    }
    ,
    {
        sequelize, // La instancia de Sequelize que importa
        tableName: 'users',
        timestamps: false,
        freezeTableName: true,
    }
)

export default UserModel