import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js'
import { PersonModel } from './person.js';

export const UserModel = sequelize.define(
    'users',
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



    },
    {
        timestamps: false,
        freezeTableName: true,
    });

UserModel.belongsTo(PersonModel, { foreignKey: 'idUser', targetKey: 'idPerson' });


