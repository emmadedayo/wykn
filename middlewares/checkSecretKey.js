require("dotenv").config();

const checkSecretKey = async (req, res, next) => {
  if (req.header("KEY") !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized access",
    });
  } else {
    next();
  }
};

module.exports = {
  checkSecretKey,
};
