import expressJwt from 'express-jwt';
import User from "../models/User";

function jwt() {
    const secret = "mysecret94652";
    return expressJwt({secret, isRevoked}).unless({
        path: [
            '/users/authenticate',
            '/songs',
            '/songs/:id',
            '/albums/:id',
            '/albums',
            '/categories',
            '/songs/category',
            '/albums/category',
        ]
    });
}

const isRevoked = async (req, payload, done) => {
    const user = await User.findOne({where: {id: payload.sub}});
    if (user) {
        return done(null, true);
    }
    done();
};

export default jwt;