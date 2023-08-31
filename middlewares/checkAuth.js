require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
    try {
        // extracting the token
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME });
       // const token_is_valid = await getCache(token);

        if (token == null) {
          return res.status(403).json({
              status: false,
              error: "Unauthorized",
              message: "Token is expired or invalid!",
        })      
        }
        req.token = token;
        req.userData = decodedToken;
        next();
    }

    catch (error) {
        res.status(403).json({
            status: false,
            error: "Unauthorized",
            message: "Token is expired or invalid!",
        })
    }
}


const checkTokenSecret = async (req, res, next) => {
    // extracting the token
    const token = req.headers.authorization.split(" ")[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
        ignoreExpiration : true
      });
      //const token_is_valid = await getCache(token);
      //console.log(token_is_valid);
      if (token !== null) {
      console.error("token does not exist in cache");
        return res.status(403).json({
          status: false,
          error: "Unauthorized",
          message: "Token is expired or invalid!",
        });
      }
      req.token = token;
      req.userData = decodedToken;
      next();
    }
    catch (error) {
      res.status(403).json({
          status: false,
          error: "Unauthorized",
          message: "Token is expired or invalid!",
      });
    }
  }

module.exports = {
  checkAuth,
  checkTokenSecret
}
