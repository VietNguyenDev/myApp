import Joi from "joi";
import { getAllShippingDetail } from "../../services/shipping.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(limits) {
  try {
    const schema = Joi.object({
      limits: Joi.number().required(),
    });

    return await schema.validateAsync({ limits: limits });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function getAllShippingDetailController(req, res) {
  try {
    const { limits } = req.query;
    await validate(limits);

    const shippingDetails = await getAllShippingDetail(limits);
    res.status(200).json(shippingDetails);
  } catch (error) {
    return abort(500, error.message);
  }
}
