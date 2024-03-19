import Joi from "joi";
import { getAllFavorite } from "../../services/favorite.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(limit, page) {
  try {
    const schema = Joi.object({
      limit: Joi.number().required(),
      page: Joi.number().required(),
    });

    return await schema.validateAsync(limit, page);
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function getAllFavoriteController(req, res) {
  try {
    const { limit, page } = req.query;
    await validate(limit, page);

    const favorites = await getAllFavorite({ limit, page });
    return res.status(200).json(favorites);
  } catch (error) {
    return abort(500, error.message);
  }
}
