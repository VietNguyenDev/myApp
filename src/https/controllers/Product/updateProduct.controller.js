import Joi from "joi";
import { update } from "../../services/products.service.js";
import { abort } from "../../../helper/abort.js";

async function validate({ productId, params }) {
  try {
    const schema = Joi.object({
      productId: Joi.string().required(),
      params: Joi.object({
        productName: Joi.string().required(),
        sellingPrice: Joi.number().required(),
        productDescription: Joi.string().required(),
        productImage: Joi.string().required(),
        categoryId: Joi.number().required(),
        productQuantity: Joi.number().required(),
        productSize: Joi.string().required(),
        discount: Joi.number().required(),
      }),
    });

    return await schema.validateAsync({ productId: productId, params: params });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function updateController(req, res) {
  try {
    const { productId } = req.params;
    const params = req.body;
    await validate({ productId, params });
    const product = await update(productId, params);

    return res.status(200).json(product);
  } catch (error) {
    return abort(400, error);
  }
}
