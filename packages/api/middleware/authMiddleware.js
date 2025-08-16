const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startWith("Bearer")) {
    return res
      .status(401)
      .json({ error: "No token provided or token is invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, roles: decoded.roles };
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized to access." });
  }
};

const authorize = (role = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles.some((role) => rols.includes(role))) {
      return res
        .status(403)
        .json({ error: "Forbidden: You do not have the required role." });
    }
    next();
  };
};

module.exports = { authMiddleware, authorize };
