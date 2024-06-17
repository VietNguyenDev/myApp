import Joi from "joi";
import { updateShippingDetail } from "../../services/shipping.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(id, params) {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
      params: Joi.object({
        userId: Joi.number().required(),
        fullName: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
      }),
    });

    return await schema.validateAsync({ id: id, params: params });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function updateShippingDetailController(req, res) {
  try {
    const { id } = req.params;
    const params = req.body;
    await validate(id, params);

    const shippingDetail = await updateShippingDetail(id, params);
    res.status(200).json(shippingDetail);
  } catch (error) {
    return abort(500, error.message);
  }
}
