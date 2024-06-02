import { verifyToken } from "../helper/jwt.js";
import db from "../models/index.js";

async function checkAuth(req) {
  const authorization = req.headers.authorization || "";
  if (authorization === "") return false;

  if (!authorization.startsWith("Bearer ")) return false;

  const token = authorization.slice(7, authorization.length);

  const payload = await verifyToken(token);

  if (payload === false) return false;
  const user = await db.models.User.findOne({ where: { id: payload.id } });

  if (!user) return false;
  return user;
}

export async function authenticate(req, res, next) {
  const user = await checkAuth(req);
  if (!user) {
    return res.status(401).send({
      message: "You must be logged in",
    });
  }
  req.user = user;
  return next();
}
