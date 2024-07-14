import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/mysql'


export const AccessTokenModel = sequelize.define(
    'it_access_tokens',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        idUser: {
            type: DataTypes.INTEGER,
        },

        token: {
            type: DataTypes.STRING,
        },
        namespace: {
            type: DataTypes.STRING,
        },
        revoked: {
            type: DataTypes.TINYINT,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
        expires_at: {
            type: DataTypes.DATE,
        },
    }, {
    timestamps: false,
    freezeTableName: true,

}
)

export default AccessTokenModel

// import { AccessTokenAttributes } from '../interfaces/accessToken';

// // Definir una interfaz para los atributos opcionales durante la creación

// interface AccessTokenCreationAttributes extends Optional<AccessTokenAttributes, 'id' | 'updated_at'> { }

// // Crear la clase de modelo extendiendo `Model`
// class AccessTokenModel extends Model<AccessTokenAttributes, AccessTokenCreationAttributes> implements AccessTokenAttributes {
//     public id!: string
//     public idUser!: string
//     public token!: string
//     public namespace!: string
//     public revoked!: number
//     public created_at!: Date
//     public updated_at!: Date
//     public expires_at!: Date
// }

// // Definir el modelo usando la clase

// AccessTokenModel.init(
//     {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//     },
//     idUser: {
//         type: DataTypes.INTEGER,
//     },

//     token: {
//         type: DataTypes.STRING,
//     },
//     namespace: {
//         type: DataTypes.STRING,
//     },
//     revoked: {
//         type: DataTypes.TINYINT,
//     },
//     created_at: {
//         type: DataTypes.DATE,
//     },
//     updated_at: {
//         type: DataTypes.DATE,
//     },
//     expires_at: {
//         type: DataTypes.DATE,
//     },
// }, {
//     sequelize,
//     tableName: 'it_access_tokens',
//     timestamps: false,
//     freezeTableName: true,

// }
// )





