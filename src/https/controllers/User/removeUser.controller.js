import Joi from "joi";
import { removeUser } from "../../services/users.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(userId) {
  try {
    const schema = Joi.object({
      userId: Joi.number().required(),
    });

    return await schema.validateAsync({ userId: userId });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function removeUserController(req, res) {
  try {
    const { userId } = req.params;
    await validate({ userId });
    const user = await removeUser(userId);

    return res.status(200).json(user);
  } catch (error) {
    return abort(400, error);
  }
}
