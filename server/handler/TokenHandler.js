const jwt = require('jsonwebtoken')
const {User} = require('../models')

const TokenDecode = (req) => {
  const bearerHeader = req?.headers["authorization"]
  if (!bearerHeader) return false

  const token = bearerHeader.split(" ")[1];
  if (!token) return false

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    return decoded
  } catch (error) {
    console.error("JWT Verify Error:", error.message)
    return false
  }
}

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
}
exports.verifyRefreshToken = async (req, res) => {
  try {
      const refreshToken = req.cookies.refreshToken
      if (!refreshToken) {
          return res.status(401).json("No refresh token provided");
      }

      jwt.verify(refreshToken, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
          if (err) return res.status(403).json("Refresh token expired or invalid");
          console.log(decoded.id)
          const user = await User.findById(decoded.id);
          if (!user) return res.status(404).json("User not found");

          if (user.refreshToken !== refreshToken) {
              return res.status(403).json("Refresh token mismatch");
          }

          const newAccessToken = jwt.sign(
              { id: user._id },
              process.env.TOKEN_SECRET_KEY,
              { expiresIn: "15m" }
          );

          return res.status(200).json({ token: newAccessToken });
      });
  } catch (error) {

      return res.status(500).json("Internal server error");
  }
}