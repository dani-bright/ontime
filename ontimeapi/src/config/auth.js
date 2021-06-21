import jsonWebToken from "jsonwebtoken";
import User from "../models/user";
import Role from "../models/Role";

class Auth {
    static auth(roles) {
        return async (req, res, next) => {
            try {
                const token = req.headers.authorization.replace(/Bearer /g, '');
                const decryptToken = jsonWebToken.decode(token, "mysecret94652");
                const user = await User.findOne({
                    where: {
                        id: decryptToken.sub
                    },
                    include: [Role]
                });

                if (user && user.getRoles()[0] === "ROLE_USER") {
                    next();
                } else if (user && roles.includes(user.user_role)) {
                    next();
                } else {
                    res.status(401).json({'message': 'Unauthorized'})
                }

            } catch (error) {
                res.status(403).json({'message': 'error 403'})
            }
        }
    }
}


export default Auth;