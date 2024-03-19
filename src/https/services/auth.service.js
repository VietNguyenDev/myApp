import db from "../../models/index.js";
import bcrypt from "bcrypt";
import { abort } from "../../helper/abort.js";
import { generateToken } from "../../helper/jwt.js";

export async function signIn(params) {
  try {
    console.log("🚀 ~ signIn ~ params:", params);
    const findUser = await db.models.User.findOne({
      where: { email: params.email },
    });
    console.log("🚀 ~ signIn ~ findUser:", findUser);

    if (findUser) {
      return abort(400, "Email already exists");
    }

    const salt = parseInt(process.env.SALT);

    const hashedPassword = await bcrypt.hash(params.password, salt);
    console.log("🚀 ~ signIn ~ hashedPassword:", hashedPassword);

    const data = await db.models.User.create({
      password: hashedPassword,
      refreshToken: process.env.REFRESH_TOKEN,
      email: params.email,
      fullName: params.fullName,
      username: params.username,
    });

    return data;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function login(email, password) {
  try {
    const findUser = await db.models.User.findOne({ where: { email } });

    if (!findUser) {
      return abort(400, "Email not found");
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);

    if (!comparePassword) {
      return abort(400, "Password is incorrect");
    }

    const payload = {
      id: findUser.id,
      email: findUser.email,
      role: findUser.role,
    };

    const token = await generateToken(payload);

    return token;
  } catch (error) {
    return abort(500, error.message);
  }
}
