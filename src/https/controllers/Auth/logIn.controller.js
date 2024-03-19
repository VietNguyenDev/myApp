import Joi from "joi";
import { login } from "../../services/auth.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(email, password) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    return await schema.validateAsync({ email, password });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function logInController(req, res) {
  try {
    const { email, password } = req.body;
    await validate(email, password);

    const token = await login(email, password);
    res.status(200).json({
      message: "Login success",
      data: token,
    });
  } catch (error) {
    abort(500, error.message);
  }
}
