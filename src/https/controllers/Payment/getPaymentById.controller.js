import Joi from "joi";
import { getPaymentById } from "../../services/payment.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(id) {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    return await schema.validateAsync(id);
  } catch (error) {
    return abort(400, error.message);
  }
}

export async function getPaymentByIdController(req, res) {
  try {
    const id = req.params;
    await validate(id);
    const payment = await getPaymentById(id);
    return res.status(200).send({
      message: "Get payment by id successfully",
      payment,
    });
  } catch (error) {
    return abort(400, error.message);
  }
}
