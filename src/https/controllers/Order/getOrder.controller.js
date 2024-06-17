import Joi from "joi";
import { getOrderDetailById } from "../../services/orderDetail.service.js";
import { abort } from "../../../helper/abort.js";

async function validate({ id }) {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    return await schema.validateAsync({ id });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function getOrderDetailByIdController(req, res) {
  try {
    const { id } = req.params;
    await validate({ id });
    const orderDetail = await getOrderDetailById(id);
    res.status(200).json(orderDetail);
  } catch (error) {
    return abort(500, error.message);
  }
}
