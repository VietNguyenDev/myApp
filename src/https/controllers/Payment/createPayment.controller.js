import Joi from "joi";
import { createPayment } from "../../services/payment.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(params) {
  try {
    const schema = Joi.object({
      params: Joi.object({
        orderId: Joi.number().required(),
        userId: Joi.number().required(),
        code: Joi.string().required(),
        status: Joi.number().required().min(1).max(3),
      }),
    });
    return await schema.validateAsync(params);
  } catch (error) {
    return abort(400, error.message);
  }
}

export async function createPaymentController(req, res) {
  try {
    const params = req.body;
    await validate({ params });
    console.log("🚀 ~ createPaymentController ~ params:", params);

    const payment = await createPayment(params);
    return res.status(201).send({
      message: "Create payment successfully",
      payment,
    });
  } catch (error) {
    return abort(400, error.message);
  }
}
