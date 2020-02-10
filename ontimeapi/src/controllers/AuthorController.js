import Author from "../models/Author";
import Album from "../models/Album";
import Song from "../models/Song";

class AuthorController {
    /***
     * Create User into Database
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    static async create(req, res) {
        let status = 200;
        let body = {};
        try {
            // Note: using `force: true` will drop the table if it already exists
            await Author.sync();
            // Now the `authors` table in the database corresponds to the model definition
            const author = await Author.create({
                name: req.body.name,
            });
            body = {
                author,
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
            await Author.sync();

            const authors = await Author.findAll({
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
                authors,
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
            await Author.sync();

            const author = await Author.findOne({
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
                ],
            });
            const albums = await Album.findAll({
                where: {
                    authorId: author.id
                }
            });
            body = {
                author,
                albums,
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
            await Author.sync();

            await Author.destroy({where: {id: req.params.id}});

            body = {
                'message': "author deleted"
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
            const author = await Author.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            body = {
                author: author,
                'message': "200"
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message}
        }
        return res.status(status).json(body);
    };
}


export default AuthorController