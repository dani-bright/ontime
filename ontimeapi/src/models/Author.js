import database from "../config/database";
import {Sequelize} from "sequelize";


const Author = database.define('author', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

}, {
    timestamps: false,
    freezeTableName: true,
});

Author.sync();

export default Author;