import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js'

export const PersonModel = sequelize.define(
    'persons',
    {
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
            type: DataTypes.ENUM,
            values: ['F', 'M']
        },

        email: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },

        birthDate: {
            type: DataTypes.DATE,
            // get() {
            //     return sequelize.Sequelize.fn('DATE_FORMAT', sequelize.Sequelize.col('birthDate'), '%Y-%m-%d %H:%i:%s');

            // }
        },

        document: {
            type: DataTypes.STRING
        },

        phone: {
            type: DataTypes.STRING
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
            defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
        },

        updateDate: {
            type: DataTypes.DATE,
            defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')

        },

        deletionDate: {
            type: DataTypes.DATE,
        }



    },
    {
        timestamps: false,
        freezeTableName: true,
    });


