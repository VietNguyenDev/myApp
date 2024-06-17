import Joi from "joi";
import { createOrderDetail } from "../../services/orderDetail.service.js";
import { abort } from "../../../helper/abort.js";

async function validate({ shippingId }) {
  try {
    const schema = Joi.object({
      shippingId: Joi.number().required(),
    });

    return await schema.validateAsync({ shippingId });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function createOrderDetailController(req, res) {
  try {
    const { shippingId } = req.body;

    await validate({ shippingId });

    const orderDetail = await createOrderDetail({ shippingId });

    return res.status(201).json(orderDetail);
  } catch (error) {
    return abort(500, error.message);
  }
}
