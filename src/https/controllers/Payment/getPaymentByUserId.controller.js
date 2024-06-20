import Joi from "joi";
import { getPaymentByUserId } from "../../services/payment.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(userId) {
  try {
    const schema = Joi.object({
      userId: Joi.number().required(),
    });
    return await schema.validateAsync(userId);
  } catch (error) {
    return abort(400, error.message);
  }
}

export async function getPaymentByUserIdController(req, res) {
  try {
    const userId = req.params;
    await validate(userId);
    const payment = await getPaymentByUserId(userId);
    return res.status(200).send({
      message: "Get payment by user id successfully",
      payment,
    });
  } catch (error) {
    return abort(400, error.message);
  }
}
