import database from "../config/database";
import {Sequelize} from "sequelize";


const User = database.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
    },

}, {
    timestamps: false,
    freezeTableName: true,
});


export default User;