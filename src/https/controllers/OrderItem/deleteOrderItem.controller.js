import Joi from "joi";
import { removeOrderItem } from "../../services/orderItem.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(id) {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    return await schema.validateAsync({ id: id });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function deleteOrderItemController(req, res) {
  try {
    const { id } = req.params;
    await validate(id);
    const orderItem = await removeOrderItem(id);
    res.status(200).json(orderItem);
  } catch (error) {
    return abort(500, error.message);
  }
}
