import Joi from "joi";
import { remove } from "../../services/products.service.js";
import { abort } from "../../../helper/abort.js";

async function validate(productId) {
  try {
    const schema = Joi.object({
      productId: Joi.number().required(),
    });

    return await schema.validateAsync(productId);
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function removeController(req, res) {
  try {
    const { productId } = req.params;
    await validate({ productId });
    const product = await remove(productId);

    return res.status(200).json(product);
  } catch (error) {
    return abort(400, error);
  }
}
