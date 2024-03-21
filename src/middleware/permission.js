import Role from "../enum/Role.js";

export async function checkPermission(req, res, next) {
  if (req.user.role === Role.ADMIN) {
    return next();
  }
  return res.status(403).send("Access denied");
}
