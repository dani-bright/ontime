import database from "../config/database";
import {Sequelize} from "sequelize";


const Author = database.define('author', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

}, {
    timestamps: false,
    freezeTableName: true,
});

export default Author;