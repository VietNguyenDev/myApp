import Joi from "joi";
import { getPaymentByStatus } from "../../services/payment.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(status) {
  try {
    const schema = Joi.object({
      status: Joi.number().required().min(1).max(3),
    });
    return await schema.validateAsync(status);
  } catch (error) {
    return abort(400, error.message);
  }
}

export async function getPaymentByStatusController(req, res) {
  try {
    const status = req.params;
    await validate(status);
    const payment = await getPaymentByStatus(status);
    return res.status(200).send({
      message: "Get payment by status successfully",
      payment,
    });
  } catch (error) {
    return abort(400, error.message);
  }
}
