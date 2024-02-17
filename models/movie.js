import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const MovieModel = sequelize.define(
    'movies',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userCreate: {
            type: DataTypes.INTEGER,
        },
        userLastChange: {
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING,
        },
        poster: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.TINYINT,
        },
        creationDate: {
            type: DataTypes.DATE,
        },
        lastChangeDate: {
            type: DataTypes.DATE,
        },
        genre: {
            type: DataTypes.STRING,
        },
        director: {
            type: DataTypes.STRING,
        },
        year: {
            type: DataTypes.INTEGER,
        },
        duration: {
            type: DataTypes.INTEGER,
        },
        rate: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

