import Joi from "joi";
import { getCartList } from "../../services/cart.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(params) {
  try {
    const schema = Joi.object({
      userId: Joi.number().required(),
      page: Joi.number().required(),
      limit: Joi.number().required(),
    });

    return await schema.validateAsync(params);
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function getCartListController(req, res) {
  try {
    const { userId } = req.params;

    const { page, limit } = req.query;

    await validate({ userId, page, limit });
    const cart = await getCartList(userId, limit, page);
    return res.status(200).json(cart);
  } catch (error) {
    return abort(500, error.message);
  }
}
