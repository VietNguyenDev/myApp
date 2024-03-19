import Joi from "joi";
import { createOrderItem } from "../../services/orderItem.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(cartId, params) {
  try {
    const schema = Joi.object({
      cartId: Joi.number().required(),
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
    });

    return await schema.validateAsync(cartId, params);
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function createOrderItemController(req, res) {
  try {
    const cartId = req.params;
    const params = req.body;

    await validate(cartId, params);
    const orderItem = await createOrderItem(cartId, params);
    res.status(201).json(orderItem);
  } catch (error) {
    return abort(500, error.message);
  }
}
