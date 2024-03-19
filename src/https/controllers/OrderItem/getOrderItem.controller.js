import Joi from "joi";
import { getOrderItem } from "../../services/orderItem.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(id) {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    return await schema.validateAsync(id);
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function getOrderItemController(req, res) {
  try {
    const { id } = req.params;
    await validate(id);
    const orderItem = await getOrderItem(id);
    res.status(200).json(orderItem);
  } catch (error) {
    return abort(500, error.message);
  }
}
