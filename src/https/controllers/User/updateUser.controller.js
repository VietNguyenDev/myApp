import Joi from "joi";
import { updateUser } from "../../services/users.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(userId, params) {
  try {
    const schema = Joi.object({
      userId: Joi.number().required(),
      params: Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        fullName: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        avatar: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        gender: Joi.string().required(),
      }),
    });

    return await schema.validateAsync({ userId, params });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function updateUserController(req, res) {
  try {
    const { params } = req.body;
    const { userId } = req.query;
    await validate(userId, params);
    const user = await updateUser(userId, params);

    return res.status(200).json(user);
  } catch (error) {
    return abort(400, error);
  }
}
