import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js'

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
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);


