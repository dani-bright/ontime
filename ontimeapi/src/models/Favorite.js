import database from "../config/database";
import {Sequelize} from "sequelize";


const Favorite = database.define('favorite', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    songId: {
        type: Sequelize.INTEGER,
    },
    albumId: {
        type: Sequelize.INTEGER,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

Favorite.sync();

export default Favorite;