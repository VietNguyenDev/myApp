import Joi from "joi";
import { removeFavoriteProd } from "../../services/favorite.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(params) {
  try {
    const schema = Joi.object({
      productId: Joi.number().required(),
      userId: Joi.number().required(),
    });

    return await schema.validateAsync(params);
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function deleteFavoriteProdController(req, res) {
  try {
    const params = req.body;
    await validate(params);
    const favorite = await removeFavoriteProd(params);
    res.status(200).json(favorite);
  } catch (error) {
    abort(500, error.message);
  }
}
