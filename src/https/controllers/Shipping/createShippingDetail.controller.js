import Joi from "joi";
import { createShippingDetail } from "../../services/shipping.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(params) {
  try {
    const schema = Joi.object({
      userId: Joi.number().required(),
      fullName: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
    });

    return await schema.validateAsync(params);
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function createShippingDetailController(req, res) {
  try {
    const params = req.body;
    await validate(params);

    const shippingDetail = await createShippingDetail(params);
    res.status(200).json(shippingDetail);
  } catch (error) {
    return abort(500, error.message);
  }
}
