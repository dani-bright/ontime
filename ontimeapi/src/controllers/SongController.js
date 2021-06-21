import Song from "../models/Song";
import Author from "../models/Author";
import Album from "../models/Album";
import Category from "../models/Category";

class SongController {
    /***
     * Create Song into Database
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    static async create(req, res) {
        let status = 200;
        let body = {};
        try {
            const song = await Song.create({
                name: req.body.name,
                img: req.body.img,
                audio: req.body.audio,
                categoryId: req.body.categoryId,
            }, {
                include: [
                    Album, Author
                ],
            });
            song.addAuthor(await Author.findOne({where: {id: req.body.authorId}}));
            req.body.albumId && song.addAlbum(await Album.findOne({where: {id: req.body.albumId}}));
            body = {
                song,
                'message': "song added to database",
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message}
        }

        return res.status(status).json(body)

    }


    static async findAll(req, res) {
        let status = 200;
        let body = {};
        try {
            const songs = await Song.findAll({
                include: [
                    {
                        model: Author,
                        through: {
                            attributes: []
                        },
                    },
                    {
                        model: Album,
                        through: {
                            attributes: []
                        },
                    },
                ]
            });
            body = {
                songs,
                'message': "200"
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message}
        }

        return res.status(status).json(body);
    }


    static async findOne(req, res) {
        let status = 200;
        let body = {};
        try {
            const song = await Song.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: Author,
                        through: {
                            attributes: []
                        },
                    },
                    {
                        model: Album,
                        through: {
                            attributes: []
                        },
                    },
                ]
            });
            const category = await Category.findOne({where: {id: song.categoryId}})
            body = {
                song,
                category,
                'message': "200"
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message}
        }

        return res.status(status).json(body);
    };

    static async delete(req, res) {
        let status = 200;
        let body = {};
        try {
            await Song.destroy({where: {id: req.params.id}});

            body = {
                'message': "song deleted"
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message}
        }

        return res.status(status).json(body);
    };

    static async update(req, res) {
        let status = 200;
        let body = {};
        try {
            const song = await Song.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            body = {
                song: song,
                'message': "200"
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message}
        }
        return res.status(status).json(body);
    };
}


export default SongController