 import jwt from "jsonwebtoken";
import User from "../models/User";
import Role from "../models/Role";
import {getUserFavorite} from "../helpers/getUserFavorite";
import Favorite from "../models/Favorite";

class UserController {
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

            const user = await User.create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                img: req.body.img
            }, {
                include: [Role]
            });
            user.addRole(await Role.findOne({where: {name: "ROLE_USER"}}));
            body = {
                user,
                'message': "200",
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message}
        }

        return res.status(status).json(body)

    }

    static async authenticate(req, res) {
        let status = 200;
        let body = {};
        try {
            const user = await User.findOne({
                where: {username: req.body.username},
                include: [{
                    model: Role,
                    through: {
                        attributes: []
                    },
                }]
            });
            if (user && user.password === req.body.password) {
                const token = jwt.sign({sub: user._id}, "mysecret94652");
                const favorites = await Favorite.findAll(
                    {
                        where: {
                            userId: user.id
                        }
                    });

                body = {
                    user: {
                        user,
                        favorites,
                    },
                    token,
                    'message': "User authenticated"
                }
            } else {
                status = 401;
                body = {
                    'message': "username OR password unknown"
                }
            }

        } catch (error) {
            status = 500;
            body = {'message': error.message}
        }

        return res.status(status).json(body);
    }

    static async findAll(req, res) {
        let status = 200;
        let body = {};
        try {
            const users = await User.findAll({
                include: [{
                    model: Role,
                    through: {
                        attributes: []
                    },
                }]
            });
            body = {
                users,
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
            const user = await User.findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: Role,
                    through: {
                        attributes: []
                    },
                }]
            });

            const favorites = await getUserFavorite(user);

            body = {
                user,
                favorites,
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
            await User.destroy({where: {id: req.params.id}});

            body = {
                'message': "user deleted"
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
            const user = await User.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            body = {
                user,
                'message': "200"
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message}
        }
        return res.status(status).json(body);
    };
}


export default UserController