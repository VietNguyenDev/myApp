import Joi from "joi";
import { updatePaymentById } from "../../services/payment.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(status, id) {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
      status: Joi.number().required().min(1).max(3),
    });
    return await schema.validateAsync({ id, status });
  } catch (error) {
    return abort(400, error.message);
  }
}

export async function updatePaymentController(req, res) {
  try {
    const { status } = req.body;
    const { id } = req.params;
    await validate(status, id);
    const payment = await updatePaymentById(status, id);
    return res.status(200).send({
      message: "Update payment successfully",
      payment,
    });
  } catch (error) {
    return abort(400, error.message);
  }
}
