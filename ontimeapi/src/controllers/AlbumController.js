import Album from "../models/Album";
import Category from "../models/Category";
import Song from "../models/Song";

class AlbumController {
    /***
     * Create Album into Database
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    static async create(req, res) {
        let status = 200;
        let body = {};
        try {

            const album = await Album.create({
                name: req.body.name,
                img: req.body.img,
                authorId: req.body.authorId,
                categoryId: req.body.categoryId,
            });

            body = {
                album,
                'message': "200",
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

            const albums = await Album.findAll({
                include: [
                    {
                        model: Song,
                        through: {
                            attributes: []
                        },
                    },
                ]
            });

            body = {
                albums,
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

            const album = await Album.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: Song,
                        through: {
                            attributes: []
                        },
                    },
                ]
            });

            const category = await Category.findOne({where: {id: album.categoryId}});

            body = {
                album,
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

            await Album.destroy({where: {id: req.params.id}});

            body = {
                'message': "album deleted"
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
            const album = await Album.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            body = {
                album: album,
                'message': "200"
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message}
        }
        return res.status(status).json(body);
    };
}


export default AlbumController