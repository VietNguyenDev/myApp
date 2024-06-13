import Joi from "joi";
import { signIn } from "../../services/auth.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(params) {
  try {
    const schema = Joi.object({
      params: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        fullName: Joi.string().required(),
        username: Joi.string().required(),
      }),
    });

    return await schema.validateAsync({ params });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function signInController(req, res) {
  try {
    const params = req.body;
    console.log("🚀 ~ signInController ~ req.body:", req.body);
    console.log("🚀 ~ signInController ~ params:", params);
    await validate(params);

    const data = await signIn(params);

    return res.status(201).json({
      message: "Sign in successfully",
      data,
    });
  } catch (error) {
    return abort(500, error.message);
  }
}
