import Joi from "joi";
import { getAllUsers } from "../../services/users.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(limits, page) {
  try {
    const schema = Joi.object({
      limits: Joi.number().required(),
      page: Joi.number().required(),
    });

    return await schema.validateAsync({ limits, page });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function getAllUserController(req, res) {
  try {
    const { limits, page } = req.params;
    await validate({ limits, page });
    const users = await getAllUsers({ limits, page });

    return res.status(200).json(users);
  } catch (error) {
    return abort(400, error);
  }
}
