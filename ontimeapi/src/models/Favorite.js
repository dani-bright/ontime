import database from "../config/database";
import {Sequelize} from "sequelize";


const Favorite = database.define('favorite', {
    userId: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    songId: {
        type: Sequelize.UUID,
    },
    albumId: {
        type: Sequelize.UUID,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

Favorite.sync();

export default Favorite;