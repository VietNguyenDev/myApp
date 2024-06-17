import Joi from "joi";
import { createOrderItem } from "../../services/orderItem.service.js";
import { abort } from "../../../helper/abort.js";

async function validate({ params }) {
  try {
    const schema = Joi.object({
      params: Joi.object({
        productId: Joi.number().required(),
        quantity: Joi.number().required(),
        productColor: Joi.string().required(),
        productSize: Joi.string().required(),
      }),
    });

    return await schema.validateAsync({ params: params });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function createOrderItemController(req, res) {
  try {
    const params = req.body;
    await validate({ params });
    const orderItem = await createOrderItem(params);
    res.status(201).json(orderItem);
  } catch (error) {
    return abort(500, error.message);
  }
}
