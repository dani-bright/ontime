import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import database from "./src/config/database";
import router from "./src/routes/routes";
import Role from "./src/models/Role";
import Album from "./src/models/Album";
import Song from "./src/models/Song";
import Author from "./src/models/Author";
import Category from "./src/models/Category";
import Favorite from "./src/models/Favorite";
import User from "./src/models/User";
import jwt from "./src/config/jwt";

const app = express();

// app.use(jwt());

app.use(bodyParser.urlencoded({
    extended: true, limit: '50mb'
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors({origin: true}));

app.use(router);

database.authenticate().then(() => {
    console.log('You are now connected to the database');
    User.belongsToMany(Role, {through: "user_role", foreignKey: 'user_id', timestamps: false, onDelete: 'cascade'});
    Role.belongsToMany(User, {through: "user_role", foreignKey: 'role_id', timestamps: false, onDelete: 'cascade'});

    Album.belongsToMany(Song, {through: "song_album", foreignKey: 'album_id', timestamps: false, onDelete: 'cascade'});
    Song.belongsToMany(Album, {through: "song_album", foreignKey: 'song_id', timestamps: false, onDelete: 'cascade'});

    Author.belongsToMany(Song, {
        through: "author_song",
        foreignKey: 'author_id',
        timestamps: false,
        onDelete: 'cascade'
    });
    Song.belongsToMany(Author, {through: "author_song", foreignKey: 'song_id', timestamps: false, onDelete: 'cascade'});

    Author.hasMany(Album, {onDelete: 'cascade'});
    Album.belongsTo(Author, {onDelete: 'cascade'});

    Category.hasMany(Album, {onDelete: 'cascade'});
    Album.belongsTo(Category, {onDelete: 'cascade'});
    Category.hasMany(Song);
    Song.belongsTo(Category);

    User.hasMany(Favorite);
    Album.hasMany(Favorite);
    Song.hasMany(Favorite);

    // Note: using `force: true` will drop the table if it already exists
    User.sync();
    Album.sync();
    Song.sync();
    Author.sync();
    Role.sync();
    Favorite.sync();
    Category.sync();

    // Now the `users` table in the database corresponds to the model definition
    //execute the relations
    database.sync({logging: false});

    app.listen('3080', function (req, res) {
        console.log("app is listening on 3080")
    });
});



