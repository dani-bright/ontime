import database from "../config/database";
import {Sequelize} from "sequelize";


const Category = database.define('category', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

}, {
    timestamps: false,
    freezeTableName: true,
});

Category.sync();

export default Category;