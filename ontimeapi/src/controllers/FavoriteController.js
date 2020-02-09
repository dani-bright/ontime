import Favorite from "../models/Favorite";

class FavoriteController {
    /***
     * Create Favorite into Database
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    static async create(req, res) {
        let status = 200;
        let body = {};
        try {
            // Note: using `force: true` will drop the table if it already exists
            await Favorite.sync();
            // Now the `favorites` table in the database corresponds to the model definition
            const favorite = await Favorite.create({
                userId: req.body.userId,
                songId: req.body.songId,
                albumId: req.body.albumId,
            });

            body = {
                favorite,
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
            await Favorite.sync();

            const favorites = await Favorite.findAll({
                where: {
                    userId: req.body.userId
                }
            });

            body = {
                favorites,
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
            await Favorite.sync();

            const favorites = await Favorite.findOne({
                where: {
                    userId: req.params.userId,
                    songId:req.params.songId,
                }
            });

            body = {
                favorites,
                'message': "200"
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message}
        }

        return res.status(status).json(body);
    }

    static async delete(req, res) {
        let status = 200;
        let body = {};
        try {
            await Favorite.sync();

            await Favorite.destroy({where: {id: req.params.id}});

            body = {
                'message': "favorite deleted"
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message}
        }

        return res.status(status).json(body);
    };
}


export default FavoriteController