import Joi from "joi";
import { updateOrderItem } from "../../services/orderItem.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(id, params) {
  console.log("🚀 ~ validate ~ params:", params);
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
      params: Joi.object({
        productId: Joi.number().required(),
        productColor: Joi.string().required(),
        productSize: Joi.string().required(),
        quantity: Joi.number().required(),
      }),
    });

    return await schema.validateAsync({ id: id, params: params });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function updateOrderItemController(req, res) {
  try {
    const { id } = req.params;
    const params = req.body;
    await validate(id, params);

    const orderItem = await updateOrderItem(id, params);
    res.status(200).json(orderItem);
  } catch (error) {
    return abort(500, error.message);
  }
}
