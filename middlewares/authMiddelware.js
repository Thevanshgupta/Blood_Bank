const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET || 'defaultSecret', (err, decode) => {
        if (err) {
          console.error("Error verifying token:", err);
          return res.status(401).send({
            success: false,
            message: "Authentication failed: Invalid token",
          });
        } else {
          // Token verification successful, proceed with the decoded payload
          // For example, you can access decoded.userId here
          req.decode = decode; // Attach decoded payload to the request object
          next(); // Call next middleware or route handler
        }
      });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Auth Failedd",
    });
  }
};
