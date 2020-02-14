import database from "../config/database";
import {Sequelize} from "sequelize";


const Song = database.define('song', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.TEXT('long'),
    },
    audio: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    listened: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },


}, {
    freezeTableName: true,
});
Song.sync();

export default Song;