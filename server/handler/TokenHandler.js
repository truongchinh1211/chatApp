const jwt = require('jsonwebtoken')
const {User} = require('../models')

const TokenDecode = req => {
    const bearerHeader = req?.headers["authorization"];
    if (bearerHeader) {
      const bearer = bearerHeader.split(" ")[1];
      try {
        const tokenDecoded = jwt.verify(bearer, process.env.TOKEN_SECRET_KEY)
        return tokenDecoded
      } catch (error) {
        return false;
      }
    }
  };

  exports.verifyToken = async (req, res, next) => {
    try {
        const decodedToken = TokenDecode(req);
        if (!decodedToken) {
            return res.status(401).json("Decoding token failed");
        }

        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json("Unauthorized");
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(500).json("Internal server error");
    }
};