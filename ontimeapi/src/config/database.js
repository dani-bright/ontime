import {Sequelize} from "sequelize";

// Option 1: Passing parameters separately
const database = new Sequelize('ontime', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default database;