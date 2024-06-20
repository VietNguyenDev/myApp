import Joi from "joi";
import { createOrderDetail } from "../../services/orderDetail.service.js";
import { abort } from "../../../helper/abort.js";

async function validate({ params }) {
  console.log("🚀 ~ validate ~ params:", params);
  try {
    const schema = Joi.object({
      params: Joi.object({
        shippingId: Joi.number().required(),
        userId: Joi.number().required(),
        orderItemId: Joi.number().required(),
      }),
    });

    return await schema.validateAsync({ params });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function createOrderDetailController(req, res) {
  try {
    const params = req.body;
    console.log("🚀 ~ createOrderDetailController ~ params:", params);

    await validate({ params });

    const orderDetail = await createOrderDetail({ params });

    return res.status(201).json(orderDetail);
  } catch (error) {
    return abort(500, error.message);
  }
}
