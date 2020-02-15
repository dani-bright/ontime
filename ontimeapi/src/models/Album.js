import database from "../config/database";
import {Sequelize} from "sequelize";


const Album = database.define('album', {
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    img: {
        type: Sequelize.TEXT('long'),
    },

}, {
    freezeTableName: true,
});

Album.sync();

export default Album;