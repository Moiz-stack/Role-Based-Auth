const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      console.log("The decoded user is :", req.user);
      next();
    } catch (err) {
      return res.status(400).json({
        status: "fail",
        message: "token is invalid",
      });
    }
  } else {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }
};

module.exports = verifyToken;
