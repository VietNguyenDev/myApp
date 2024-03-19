import Joi from "joi";
import { addProdToCart } from "../../services/cart.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(params) {
  try {
    const schema = Joi.object({
      userId: Joi.number().required(),
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
      productColor: Joi.string().required(),
      productSize: Joi.string().required(),
    });

    return await schema.validateAsync(params);
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function addProdController(req, res) {
  try {
    const params = req.body;
    await validate(params);

    const cart = await addProdToCart(params);
    return res.status(201).json(cart);
  } catch (error) {
    return abort(500, error.message);
  }
}
