import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js'

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
        passwordExpired: {
            type: DataTypes.INTEGER,
        },
        lastChangePassword: {
            type: DataTypes.DATE,
        },
        acceptPrivacyPolicy: {
            type: DataTypes.INTEGER,
        },


    },
    {
        timestamps: false,
        freezeTableName: true,
    });


