import Joi from "joi";
import { removeShippingDetail } from "../../services/shipping.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(id) {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    return await schema.validateAsync({ id: id });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function removeShippingDetailController(req, res) {
  try {
    const { id } = req.params;
    await validate(id);
    const shippingDetail = await removeShippingDetail(id);
    res.status(200).json(shippingDetail);
  } catch (error) {
    return abort(500, error.message);
  }
}
