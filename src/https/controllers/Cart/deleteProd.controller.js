import Joi from "joi";
import { deleteProdFromCart } from "../../services/cart.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(userId, productId) {
  try {
    const schema = Joi.object({
      userId: Joi.number().required(),
      productId: Joi.number().required(),
    });

    return await schema.validateAsync(userId, productId);
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function deleteProdController(req, res) {
  try {
    const { userId, productId } = req.params;

    await validate(userId, productId);

    const cart = await deleteProdFromCart(userId, productId);
    return res.status(200).json(cart);
  } catch (error) {
    return abort(500, error.message);
  }
}
