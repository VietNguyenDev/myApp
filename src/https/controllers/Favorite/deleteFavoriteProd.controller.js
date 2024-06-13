import Joi from "joi";
import { removeFavoriteProd } from "../../services/favorite.service.js";
import { abort } from "../../../helper/abort.js";

async function validate({ id }) {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    return await schema.validateAsync({ id });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function deleteFavoriteProdController(req, res) {
  try {
    const { id } = req.params;
    await validate({ id });
    const favorite = await removeFavoriteProd({ id });
    res.status(200).json(favorite);
  } catch (error) {
    abort(500, error.message);
  }
}
