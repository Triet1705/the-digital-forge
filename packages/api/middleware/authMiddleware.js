const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "No token provided or token is invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found." });
    }

    const permissions = user.roles.flatMap((role) =>
      role.permissions.map((p) => p.name)
    );

    req.user = {
      userId: user.id,
      roles: user.roles.map((r) => r.name),
      permissions: [...new Set(permissions)],
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized to access." });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles.some((role) => roles.includes(role))) {
      return res
        .status(403)
        .json({ error: "Forbidden: You do not have the required role." });
    }
    next();
  };
};

const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user || !req.user.permissions.includes(requiredPermission)) {
      return res
        .status(403)
        .json({ error: "Forbidden: You do not have the required permission." });
    }
    next();
  };
};

module.exports = { authMiddleware, authorize, checkPermission };
