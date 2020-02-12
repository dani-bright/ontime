import database from "../config/database";
import {Sequelize} from "sequelize";

const Role = database.define('role', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

}, {
    timestamps: false,
    freezeTableName: true,
});

Role.sync();

export default Role;
