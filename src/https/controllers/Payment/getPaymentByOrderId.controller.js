import Joi from "joi";
import { getPaymentByOrderId } from "../../services/payment.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(orderId) {
  try {
    const schema = Joi.object({
      orderId: Joi.number().required(),
    });
    return await schema.validateAsync(orderId);
  } catch (error) {
    return abort(400, error.message);
  }
}

export async function getPaymentByOrderIdController(req, res) {
  try {
    const orderId = req.params;
    await validate(orderId);
    const payment = await getPaymentByOrderId(orderId);
    return res.status(200).send({
      message: "Get payment by order id successfully",
      payment,
    });
  } catch (error) {
    return abort(400, error.message);
  }
}
