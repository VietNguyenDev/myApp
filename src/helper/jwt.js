import jwt from "jsonwebtoken";

export async function generateToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });

  return token;
}

export async function verifyToken(token) {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    return data;
  } catch (error) {
    return false;
  }
}
