import Joi from "joi";
import { getDetail } from "../../services/products.service.js";
import { abort } from "../../../helper/abort.js";

async function validate({ productId }) {
  try {
    const schema = Joi.object({
      productId: Joi.number().required(),
    });

    return await schema.validateAsync({ productId });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function getDetailController(req, res) {
  try {
    const { productId } = req.params;
    await validate({ productId });

    const product = await getDetail(productId);

    return res.status(200).json(product);
  } catch (error) {
    return abort(400, error);
  }
}
