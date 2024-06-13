import Joi from "joi";
import { deleteProdFromCart } from "../../services/cart.service.js";
import { abort } from "../../../helper/abort.js";

async function validate({ userId, productId, id }) {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
      userId: Joi.number().required(),
      productId: Joi.number().required(),
    });

    return await schema.validateAsync({
      userId: userId,
      productId: productId,
      id: id,
    });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function deleteProdController(req, res) {
  try {
    const { id } = req.params;
    const { userId, productId } = req.query;

    await validate({ userId, productId, id });

    const cart = await deleteProdFromCart({ userId, productId, id });
    return res.status(200).json(cart);
  } catch (error) {
    return abort(500, error.message);
  }
}
